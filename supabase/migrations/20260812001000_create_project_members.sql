-- Afzal Ahmad AI HQ
-- Project membership and role foundation
-- Apply after 20260812000000_create_core_ai_hq_tables.sql.

create table if not exists public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'viewer'
    check (role in ('owner','admin','operator','viewer')),
  status text not null default 'active'
    check (status in ('active','suspended','removed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, user_id)
);

create index if not exists idx_project_members_project_status
  on public.project_members(project_id, status);

create index if not exists idx_project_members_user_status
  on public.project_members(user_id, status);

-- Keep membership timestamps consistent.
drop trigger if exists trg_project_members_updated_at on public.project_members;
create trigger trg_project_members_updated_at
before update on public.project_members
for each row execute function public.set_updated_at();

-- Membership is security-sensitive. Enable RLS and begin with a minimal
-- self-read policy. Administrative write policies are added only after the
-- membership helper functions and ownership rules are reviewed.
alter table public.project_members enable row level security;

drop policy if exists project_members_select_self on public.project_members;
create policy project_members_select_self
on public.project_members
for select
to authenticated
using (user_id = auth.uid());

-- Security-definer helpers avoid relying on client-side role checks. The
-- functions are deliberately read-only and project-scoped. Their owner must
-- be a trusted database role in Supabase.
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

create or replace function public.has_project_role(
  target_project_id uuid,
  allowed_roles text[]
)
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

-- No client INSERT/UPDATE/DELETE policy is intentionally created here.
-- Initial membership creation and subsequent privileged role transitions are
-- introduced through later, explicitly reviewed security migrations.
