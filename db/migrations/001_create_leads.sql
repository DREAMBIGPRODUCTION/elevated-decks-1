create table if not exists leads (
  id bigserial primary key,
  name text not null,
  email text not null,
  phone text not null,
  project_type text not null,
  location text not null,
  message text not null,
  source_page text not null,
  user_agent text,
  ip_address inet,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_source_page_idx on leads (source_page);
