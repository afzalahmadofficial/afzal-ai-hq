-- Afzal Ahmad AI HQ
-- Auth/project membership foundation
-- Version: 1.0
-- Requires Supabase Auth and the core AI HQ schema.

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

create index if not exists idx_project_members_user_status
  on public.project_members(user_id, status);

create index if not exists idx_project_members_project_role_status
  on public.project_members(project_id, role, status);

create or replace function public.set_project_member_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_project_members_updated_at on public.project_members;
create trigger trg_project_members_updated_at
before update on public.project_members
for each row execute function public.set_project_member_updated_at();

alter table public.project_members enable row level security;

-- No project_members policies are granted in this migration.
-- Policies are intentionally added in the dedicated RLS migration after
-- membership creation/role-management behavior has been reviewed.
