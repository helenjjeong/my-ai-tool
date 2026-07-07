-- 전세자금대출 한도 계산기: 사용 로그 테이블
-- Supabase SQL Editor에서 실행하세요.

create table if not exists usage_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  income numeric not null,
  deposit numeric not null,
  credit_score smallint not null,
  estimated_limit numeric not null,
  rate_min numeric not null,
  rate_max numeric not null
);

-- 익명 클라이언트(anon key)가 로그를 기록만 할 수 있도록 설정 (조회/수정/삭제 불가)
alter table usage_logs enable row level security;

create policy "anon can insert usage logs"
  on usage_logs
  for insert
  to anon
  with check (true);
