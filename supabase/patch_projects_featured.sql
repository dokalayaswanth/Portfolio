-- Run once if your database was created from an older schema without `featured`.
alter table public.projects add column if not exists featured boolean not null default false;
create index if not exists projects_featured_idx on public.projects (featured);
