-- Afzal Ahmad AI HQ
-- Initial core schema migration
-- Version: 1.0
-- Apply only after review/testing in a non-production Supabase environment.

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','PAUSED','ARCHIVED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  agent_type text not null,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','PAUSED','DISABLED')),
  configuration jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, slug)
);

create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','PAUSED','DISABLED')),
  configuration jsonb not null default '{}'::jsonb,
  version integer not null default 1 check (version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, slug)
);

create table if not exists public.agent_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  agent_id uuid not null references public.agents(id) on delete restrict,
  workflow_id uuid references public.workflows(id) on delete set null,
  parent_task_id uuid references public.agent_tasks(id) on delete set null,
  task_type text not null,
  status text not null default 'QUEUED' check (status in ('QUEUED','RUNNING','SUCCEEDED','FAILED','CANCELLED')),
  priority integer not null default 100,
  input jsonb not null default '{}'::jsonb,
  output jsonb,
  error jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.research (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  task_id uuid references public.agent_tasks(id) on delete set null,
  question text not null,
  scope text,
  summary text,
  findings jsonb not null default '[]'::jsonb,
  confidence text check (confidence in ('HIGH','MEDIUM','LOW','UNVERIFIED')),
  status text not null default 'DRAFT' check (status in ('DRAFT','IN_PROGRESS','COMPLETED','INCOMPLETE','ARCHIVED')),
  researched_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  research_id uuid not null references public.research(id) on delete cascade,
  url text not null,
  title text,
  publisher text,
  published_at timestamptz,
  accessed_at timestamptz not null default now(),
  source_type text,
  authority_score numeric(5,2),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  content_type text not null,
  title text not null,
  slug text,
  status text not null default 'DRAFT' check (status in ('IDEA','DRAFT','REVIEW','APPROVED','SCHEDULED','PUBLISHED','ARCHIVED')),
  platform text,
  content_pillar text,
  topic text,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_versions (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references public.content(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  body text not null,
  change_summary text,
  created_by text,
  created_at timestamptz not null default now(),
  unique (content_id, version_number)
);

create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  question text not null,
  recommendation text,
  final_decision text,
  confidence text check (confidence in ('HIGH','MEDIUM','LOW','UNVERIFIED')),
  risk_level text check (risk_level in ('LOW','MEDIUM','HIGH','CRITICAL')),
  status text not null default 'PENDING' check (status in ('PENDING','DECIDED','REJECTED','SUPERSEDED')),
  decision_maker text,
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  decision_id uuid references public.decisions(id) on delete set null,
  task_id uuid references public.agent_tasks(id) on delete set null,
  action_type text not null,
  action_payload jsonb not null default '{}'::jsonb,
  risk_level text not null check (risk_level in ('LOW','MEDIUM','HIGH','CRITICAL')),
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED','EXPIRED','CANCELLED','EXECUTED','FAILED')),
  requested_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewer text,
  review_notes text,
  expires_at timestamptz
);

create table if not exists public.knowledge_memory (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  category text not null,
  statement text not null,
  source text,
  confidence text not null default 'UNVERIFIED' check (confidence in ('HIGH','MEDIUM','LOW','UNVERIFIED')),
  status text not null default 'ACTIVE' check (status in ('ACTIVE','SUPERSEDED','ARCHIVED','UNVERIFIED')),
  created_at timestamptz not null default now(),
  last_verified_at timestamptz,
  review_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  content_id uuid references public.content(id) on delete set null,
  agent_id uuid references public.agents(id) on delete set null,
  metric_name text not null,
  metric_value numeric not null,
  metric_unit text,
  platform text,
  period_start timestamptz,
  period_end timestamptz,
  source text,
  metadata jsonb not null default '{}'::jsonb,
  recorded_at timestamptz not null default now()
);

create table if not exists public.system_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  event_type text not null,
  severity text not null default 'INFO' check (severity in ('DEBUG','INFO','WARNING','ERROR','CRITICAL')),
  actor_type text not null,
  actor_id uuid,
  entity_type text,
  entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_agents_project_status on public.agents(project_id, status);
create index if not exists idx_workflows_project_status on public.workflows(project_id, status);
create index if not exists idx_tasks_project_status_created on public.agent_tasks(project_id, status, created_at desc);
create index if not exists idx_tasks_agent_status on public.agent_tasks(agent_id, status);
create index if not exists idx_tasks_workflow on public.agent_tasks(workflow_id);
create index if not exists idx_research_project_created on public.research(project_id, created_at desc);
create index if not exists idx_sources_research on public.sources(research_id);
create index if not exists idx_content_project_status on public.content(project_id, status, created_at desc);
create index if not exists idx_content_scheduled on public.content(project_id, scheduled_at);
create index if not exists idx_content_versions_content on public.content_versions(content_id, version_number desc);
create index if not exists idx_decisions_project_status on public.decisions(project_id, status);
create index if not exists idx_approvals_project_status on public.approvals(project_id, status);
create index if not exists idx_approvals_expiry on public.approvals(status, expires_at);
create index if not exists idx_memory_project_status on public.knowledge_memory(project_id, status);
create index if not exists idx_memory_review on public.knowledge_memory(review_at);
create index if not exists idx_analytics_project_recorded on public.analytics(project_id, recorded_at desc);
create index if not exists idx_events_project_created on public.system_events(project_id, created_at desc);
create index if not exists idx_events_type_created on public.system_events(event_type, created_at desc);

-- Keep updated_at consistent for mutable records.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
drop trigger if exists trg_agents_updated_at on public.agents;
create trigger trg_agents_updated_at before update on public.agents for each row execute function public.set_updated_at();
drop trigger if exists trg_workflows_updated_at on public.workflows;
create trigger trg_workflows_updated_at before update on public.workflows for each row execute function public.set_updated_at();
drop trigger if exists trg_agent_tasks_updated_at on public.agent_tasks;
create trigger trg_agent_tasks_updated_at before update on public.agent_tasks for each row execute function public.set_updated_at();
drop trigger if exists trg_research_updated_at on public.research;
create trigger trg_research_updated_at before update on public.research for each row execute function public.set_updated_at();
drop trigger if exists trg_content_updated_at on public.content;
create trigger trg_content_updated_at before update on public.content for each row execute function public.set_updated_at();
drop trigger if exists trg_decisions_updated_at on public.decisions;
create trigger trg_decisions_updated_at before update on public.decisions for each row execute function public.set_updated_at();

-- RLS is intentionally enabled here, but policies are added in a separate
-- security migration after the project membership/auth model is finalized.
alter table public.projects enable row level security;
alter table public.agents enable row level security;
alter table public.workflows enable row level security;
alter table public.agent_tasks enable row level security;
alter table public.research enable row level security;
alter table public.sources enable row level security;
alter table public.content enable row level security;
alter table public.content_versions enable row level security;
alter table public.decisions enable row level security;
alter table public.approvals enable row level security;
alter table public.knowledge_memory enable row level security;
alter table public.analytics enable row level security;
alter table public.system_events enable row level security;

-- No permissive policies are created in this migration. This prevents
-- accidental exposure through the Supabase API before project-membership
-- policies are explicitly designed and tested.
