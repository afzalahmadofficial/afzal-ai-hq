-- Afzal Ahmad AI HQ
-- Project-scoped RLS policies
-- Version: 1.0

-- Helper: active project membership.
create or replace function public.is_active_project_member(target_project_id uuid)
returns boolean
language sql
stable
security invoker
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

-- Helper: active membership with one of the requested roles.
create or replace function public.has_project_role(target_project_id uuid, allowed_roles text[])
returns boolean
language sql
stable
security invoker
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

-- Membership rows: users can see their own active membership records.
drop policy if exists project_members_select_own on public.project_members;
create policy project_members_select_own
on public.project_members
for select
to authenticated
using (user_id = auth.uid() and status <> 'removed');

-- Owners/admins can manage membership records for their project.
drop policy if exists project_members_manage_admin on public.project_members;
create policy project_members_manage_admin
on public.project_members
for all
to authenticated
using (public.has_project_role(project_id, array['owner','admin']))
with check (public.has_project_role(project_id, array['owner','admin']));

-- Projects: active members may read their project.
drop policy if exists projects_select_member on public.projects;
create policy projects_select_member
on public.projects
for select
to authenticated
using (public.is_active_project_member(id));

-- Project creation is intentionally not open to every authenticated user.
-- An application/server workflow should create projects and establish ownership.

-- Project updates/deletes are owner/admin operations.
drop policy if exists projects_update_admin on public.projects;
create policy projects_update_admin
on public.projects
for update
to authenticated
using (public.has_project_role(id, array['owner','admin']))
with check (public.has_project_role(id, array['owner','admin']));

drop policy if exists projects_delete_owner on public.projects;
create policy projects_delete_owner
on public.projects
for delete
to authenticated
using (public.has_project_role(id, array['owner']));

-- Project-scoped read access for core operational tables.
create policy agents_select_member on public.agents
for select to authenticated
using (public.is_active_project_member(project_id));

create policy workflows_select_member on public.workflows
for select to authenticated
using (public.is_active_project_member(project_id));

create policy agent_tasks_select_member on public.agent_tasks
for select to authenticated
using (public.is_active_project_member(project_id));

create policy research_select_member on public.research
for select to authenticated
using (public.is_active_project_member(project_id));

create policy sources_select_member on public.sources
for select to authenticated
using (exists (
  select 1 from public.research r
  where r.id = research_id
    and public.is_active_project_member(r.project_id)
));

create policy content_select_member on public.content
for select to authenticated
using (public.is_active_project_member(project_id));

create policy content_versions_select_member on public.content_versions
for select to authenticated
using (exists (
  select 1 from public.content c
  where c.id = content_id
    and public.is_active_project_member(c.project_id)
));

create policy decisions_select_member on public.decisions
for select to authenticated
using (public.is_active_project_member(project_id));

create policy approvals_select_member on public.approvals
for select to authenticated
using (public.is_active_project_member(project_id));

create policy knowledge_memory_select_member on public.knowledge_memory
for select to authenticated
using (public.is_active_project_member(project_id));

create policy analytics_select_member on public.analytics
for select to authenticated
using (public.is_active_project_member(project_id));

create policy system_events_select_member on public.system_events
for select to authenticated
using (public.is_active_project_member(project_id));

-- Operational writes are deliberately limited to operators/admins/owners.
create policy agents_manage_admin on public.agents
for all to authenticated
using (public.has_project_role(project_id, array['owner','admin']))
with check (public.has_project_role(project_id, array['owner','admin']));

create policy workflows_manage_admin on public.workflows
for all to authenticated
using (public.has_project_role(project_id, array['owner','admin']))
with check (public.has_project_role(project_id, array['owner','admin']));

create policy agent_tasks_operate on public.agent_tasks
for insert to authenticated
with check (public.has_project_role(project_id, array['owner','admin','operator']));

create policy agent_tasks_update_operate on public.agent_tasks
for update to authenticated
using (public.has_project_role(project_id, array['owner','admin','operator']))
with check (public.has_project_role(project_id, array['owner','admin','operator']));

create policy content_operate on public.content
for all to authenticated
using (public.has_project_role(project_id, array['owner','admin','operator']))
with check (public.has_project_role(project_id, array['owner','admin','operator']));

create policy research_operate on public.research
for all to authenticated
using (public.has_project_role(project_id, array['owner','admin','operator']))
with check (public.has_project_role(project_id, array['owner','admin','operator']));

create policy decisions_manage_admin on public.decisions
for all to authenticated
using (public.has_project_role(project_id, array['owner','admin']))
with check (public.has_project_role(project_id, array['owner','admin']));

create policy approvals_request_operate on public.approvals
for insert to authenticated
with check (public.has_project_role(project_id, array['owner','admin','operator']));

create policy approvals_review_admin on public.approvals
for update to authenticated
using (public.has_project_role(project_id, array['owner','admin']))
with check (public.has_project_role(project_id, array['owner','admin']));

create policy knowledge_memory_manage_admin on public.knowledge_memory
for all to authenticated
using (public.has_project_role(project_id, array['owner','admin']))
with check (public.has_project_role(project_id, array['owner','admin']));

create policy analytics_write_operate on public.analytics
for insert to authenticated
with check (public.has_project_role(project_id, array['owner','admin','operator']));

-- System events are read-only to project members from the application API.
-- Trusted server-side services should append audit events through controlled paths.
