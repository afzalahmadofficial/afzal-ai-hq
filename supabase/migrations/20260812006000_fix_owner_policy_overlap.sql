-- Afzal Ahmad AI HQ
-- Final ownership-policy overlap fix
-- Version: 1.0

-- The earlier corrective migration removed the broad management policy,
-- but left the older admin INSERT/UPDATE/DELETE policies in place.
-- PostgreSQL RLS policies are permissive (ORed), so those policies could
-- bypass the later non-owner restrictions.
--
-- Remove the overlapping admin write policies. The dedicated non-owner
-- policies from 05000 remain the client-facing membership write path.
-- Ownership changes must use transfer_project_ownership().

drop policy if exists project_members_insert_admin on public.project_members;
drop policy if exists project_members_update_admin on public.project_members;
drop policy if exists project_members_delete_admin on public.project_members;

-- Defense in depth: direct membership writes may never assign owner.
-- These policies are intentionally narrow and require an existing owner/admin.

-- Recreate them idempotently in case this migration is reapplied.
drop policy if exists project_members_insert_non_owner on public.project_members;
create policy project_members_insert_non_owner
on public.project_members
for insert
to authenticated
with check (
  user_id <> auth.uid()
  and role <> 'owner'
  and public.has_project_role(project_id, array['owner','admin'])
);

drop policy if exists project_members_update_non_owner on public.project_members;
create policy project_members_update_non_owner
on public.project_members
for update
to authenticated
using (
  user_id <> auth.uid()
  and public.has_project_role(project_id, array['owner','admin'])
)
with check (
  user_id <> auth.uid()
  and role <> 'owner'
  and public.has_project_role(project_id, array['owner','admin'])
);

drop policy if exists project_members_delete_non_owner on public.project_members;
create policy project_members_delete_non_owner
on public.project_members
for delete
to authenticated
using (
  user_id <> auth.uid()
  and public.has_project_role(project_id, array['owner','admin'])
  and role <> 'owner'
);
