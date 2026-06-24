create table if not exists public.app_state (
  id text primary key,
  payload text not null,
  updated_at text not null
);

create table if not exists public.event_log (
  id text primary key,
  kind text not null,
  payload text not null,
  created_at text not null
);

create index if not exists event_log_created_at_idx on public.event_log (created_at desc);
create index if not exists event_log_kind_idx on public.event_log (kind);
