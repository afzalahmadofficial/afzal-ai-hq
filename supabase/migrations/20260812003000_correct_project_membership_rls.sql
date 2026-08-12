-- Afzal Ahmad AI HQ
-- Corrective RLS migration
-- Addresses membership-policy recursion and self-escalation risks.

-- These helpers intentionally run with the function owner's privileges so
-- membership checks do not recursively evaluate project_members RLS.
-- Keep the functions narrowly scoped and do not expose arbitrary table access.
create or replace function public.is_active_project_member(target_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.project_members pm
    where pm.project_id = target_project_id
      and pm.user_id = auth.uid()
      and pm.status = 'active'
  );
$$;

create or replace function public.has_project_role(target_project_id uuid, allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.project_members pm
    where pm.project_id = target_project_id
      and pm.user_id = auth.uid()
      and pm.status = 'active'
      and pm.role = any(allowed_roles)
  );
$$;

revoke all on function public.is_active_project_member(uuid) from public;
revoke all on function public.has_project_role(uuid, text[]) from public;
grant execute on function public.is_active_project_member(uuid) to authenticated;
grant execute on function public.has_project_role(uuid, text[]) to authenticated;

-- Remove the earlier broad membership policy before installing narrower ones.
drop policy if exists project_members_manage_admin on public.project_members;
drop policy if exists project_members_select_own on public.project_members;

-- A member may inspect their own membership record.
create policy project_members_select_own
on public.project_members
for select
to authenticated
using (user_id = auth.uid() and status <> 'removed');

-- Owners/admins may inspect memberships for their project.
create policy project_members_select_admin
on public.project_members
for select
to authenticated
using (public.has_project_role(project_id, array['owner','admin']));

-- Admins/owners may add other users to their project, but cannot use the
-- public API to create their own membership. Initial ownership must be created
-- by a trusted project-creation transaction/workflow.
create policy project_members_insert_admin
on public.project_members
for insert
to authenticated
with check (
  user_id <> auth.uid()
  and public.has_project_role(project_id, array['owner','admin'])
);

-- Admins/owners may update memberships belonging to other users. Blocking
-- self-updates prevents role/status self-escalation through this policy.
create policy project_members_update_admin
on public.project_members
for update
to authenticated
using (
  user_id <> auth.uid()
  and public.has_project_role(project_id, array['owner','admin'])
)
with check (
  user_id <> auth.uid()
  and public.has_project_role(project_id, array['owner','admin'])
);

-- Membership deletion is also restricted to other users. This avoids a broad
-- self-delete/self-modification path and keeps membership lifecycle explicit.
create policy project_members_delete_admin
on public.project_members
for delete
to authenticated
using (
  user_id <> auth.uid()
  and public.has_project_role(project_id, array['owner','admin'])
);

-- Replace project policies explicitly so deployment does not depend on policy
-- state left by an earlier migration.
drop policy if exists projects_select_member on public.projects;
drop policy if exists projects_update_admin on public.projects;
drop policy if exists projects_delete_owner on public.projects;

create policy projects_select_member
on public.projects
for select
to authenticated
using (public.is_active_project_member(id));

create policy projects_update_admin
on public.projects
for update
to authenticated
using (public.has_project_role(id, array['owner','admin']))
with check (public.has_project_role(id, array['owner','admin']));

create policy projects_delete_owner
on public.projects
for delete
to authenticated
using (public.has_project_role(id, array['owner']));

-- No client INSERT policy is provided for projects. A trusted server-side
-- project-creation flow should create the project and initial owner together.

-- Remove the old membership-management policy from all future effective state.
-- Other table policies remain project-scoped and continue using the corrected
-- helper functions above.
