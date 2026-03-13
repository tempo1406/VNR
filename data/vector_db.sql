create extension if not exists vector;

create table if not exists documents (
  id bigserial primary key,
  content text not null,
  metadata jsonb default '{}'::jsonb,
  -- gemini-embedding-001 returns 3072 dimensions by default.
  embedding vector(3072) not null
);

-- pgvector indexes on `vector` are limited to 2000 dims.
-- Use halfvec index to support 3072-dim Gemini embeddings.
create index if not exists documents_embedding_idx
on documents
using hnsw ((embedding::halfvec(3072)) halfvec_cosine_ops);

create or replace function match_documents(
  query_embedding vector(3072),
  match_count int default 5,
  filter jsonb default '{}'::jsonb
)
returns table(
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable as $$
  select
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) as similarity
  from documents d
  where d.metadata @> filter
  order by (d.embedding::halfvec(3072)) <=> (query_embedding::halfvec(3072))
  limit match_count;
$$;
