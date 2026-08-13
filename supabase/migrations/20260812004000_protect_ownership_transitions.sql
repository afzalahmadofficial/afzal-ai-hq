-- Afzal Ahmad AI HQ
-- Ownership transition safeguards
-- Version: 1.0

-- Prevent an authenticated admin from assigning the owner role through the
-- normal membership-management policy. Ownership changes must use the
-- dedicated owner-transfer path below.

drop policy if exists project_members_manage_admin on public.project_members;

create policy project_members_manage_non_owner on public.project_members
for all
to authenticated
using (public.has_project_role(project_id, array['owner','admin']))
with check (
  public.has_project_role(project_id, array['owner'])
  or (
    public.has_project_role(project_id, array['admin'])
    and role <> 'owner'
  )
);

-- Owner transfer must be explicit. The function changes both sides in one
-- transaction and refuses to leave a project without an owner.
create or replace function public.transfer_project_ownership(
  target_project_id uuid,
  new_owner_user_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_owner_count integer;
  current_user_is_owner boolean;
begin
  select exists (
    select 1 from public.project_members
    where project_id = target_project_id
      and user_id = auth.uid()
      and status = 'active'
      and role = 'owner'
  ) into current_user_is_owner;

  if not current_user_is_owner then
    raise exception 'Only the current project owner may transfer ownership';
  end if;

  if new_owner_user_id is null then
    raise exception 'New owner user id is required';
  end if;

  if not exists (
    select 1 from auth.users where id = new_owner_user_id
  ) then
    raise exception 'New owner does not exist';
  end if;

  if not exists (
    select 1 from public.project_members
    where project_id = target_project_id
      and user_id = new_owner_user_id
      and status = 'active'
  ) then
    raise exception 'New owner must already be an active project member';
  end if;

  update public.project_members
  set role = 'owner', updated_at = now()
  where project_id = target_project_id
    and user_id = new_owner_user_id;

  update public.project_members
  set role = 'admin', updated_at = now()
  where project_id = target_project_id
    and user_id = auth.uid()
    and user_id <> new_owner_user_id;

  select count(*) into current_owner_count
  from public.project_members
  where project_id = target_project_id
    and status = 'active'
    and role = 'owner';

  if current_owner_count <> 1 then
    raise exception 'Ownership transfer must leave exactly one active owner';
  end if;
end;
$$;

revoke all on function public.transfer_project_ownership(uuid, uuid) from public;
grant execute on function public.transfer_project_ownership(uuid, uuid) to authenticated;

-- Prevent direct client-side deletion/demotion of the final owner through
-- ordinary membership writes. An explicit ownership transfer must happen
-- before the current owner can cease to be owner.
create or replace function public.prevent_last_owner_removal()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_count integer;
begin
  if old.role = 'owner' and old.status = 'active'
     and (new.role <> 'owner' or new.status <> 'active') then
    select count(*) into owner_count
    from public.project_members
    where project_id = old.project_id
      and status = 'active'
      and role = 'owner';

    if owner_count <= 1 then
      raise exception 'Cannot remove or demote the last active project owner';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_prevent_last_owner_removal on public.project_members;
create trigger trg_prevent_last_owner_removal
before update on public.project_members
for each row execute function public.prevent_last_owner_removal();
