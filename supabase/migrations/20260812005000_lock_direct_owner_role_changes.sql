-- Afzal Ahmad AI HQ
-- Lock direct owner-role changes
-- Version: 1.0

-- Replace the broad membership-management policy from the ownership migration
-- with separate policies. Direct INSERT/UPDATE through the membership API may
-- not create or assign the owner role. Ownership changes must use the explicit
-- transfer function.

drop policy if exists project_members_manage_non_owner on public.project_members;

create policy project_members_insert_non_owner
on public.project_members
for insert
to authenticated
with check (
  user_id <> auth.uid()
  and role <> 'owner'
  and public.has_project_role(project_id, array['owner','admin'])
);

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

create policy project_members_delete_non_owner
on public.project_members
for delete
to authenticated
using (
  user_id <> auth.uid()
  and public.has_project_role(project_id, array['owner','admin'])
  and role <> 'owner'
);

-- Ownership is changed only through transfer_project_ownership().
-- The transfer function is the single documented path that can assign owner.

-- Defense in depth: ensure the ownership-transfer function is executable only
-- by authenticated users. The function itself verifies that the caller is the
-- current active owner and that the target is an active project member.
revoke all on function public.transfer_project_ownership(uuid, uuid) from public;
grant execute on function public.transfer_project_ownership(uuid, uuid) to authenticated;
