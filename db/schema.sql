-- PTOF Database Schema
-- Phase 9: Database & Persistence Foundation

-- Session status enum:
-- 0 = active
-- 1 = archived
-- 2 = deleted

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------
-- Users
-- Placeholder for future auth/account layer.
-- Auth implementation will come later.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Providers
-- Backend-owned source of truth for providers.
-- Seeded from providerRegistry.js initially.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS providers (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  type TEXT NOT NULL, -- local | subscription | cloud | manual
  connection_mode TEXT NOT NULL, -- local | handoff | oauth | api_key | manual
  execution_mode TEXT NOT NULL DEFAULT 'manual', -- executable | manual | handoff
  executable BOOLEAN NOT NULL DEFAULT FALSE,
  requires_auth BOOLEAN NOT NULL DEFAULT FALSE,
  requires_api_key BOOLEAN NOT NULL DEFAULT FALSE,
  supports_local BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'active',
  handoff_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Provider Models
-- Models available under each provider.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS provider_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id TEXT NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  model_id TEXT NOT NULL,
  label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(provider_id, model_id)
);

-- ------------------------------------------------------------
-- Provider Connections
-- User/provider connection state.
-- Local-first mock will later migrate here.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS provider_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id TEXT NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'connected', -- connected | disconnected | error | expired
  auth_type TEXT, -- local | oauth | handoff | api_key | manual
  encrypted_token_ref TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  connected_at TIMESTAMPTZ,
  disconnected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id, provider_id)
);

-- ------------------------------------------------------------
-- Presets
-- Backend-owned preset registry.
-- Can later be seeded from presetRegistry.js.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS presets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  preset_key TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  category TEXT,
  provider_id TEXT REFERENCES providers(id) ON DELETE SET NULL,
  macro_code TEXT,
  instruction TEXT,
  is_generic BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Sessions
-- Conversation container.
-- Mirrors local ChatSession model from Phase 8.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider_id TEXT NOT NULL,
  provider_label TEXT,
  model_id TEXT,
  title TEXT NOT NULL DEFAULT 'New session',

  -- 0 = active, 1 = archived, 2 = deleted
  status SMALLINT NOT NULL DEFAULT 0,

  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT sessions_status_check CHECK (status IN (0, 1, 2))
);

-- ------------------------------------------------------------
-- Messages
-- User-visible chat messages.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- user | assistant | system
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT messages_role_check CHECK (role IN ('user', 'assistant', 'system'))
);

-- ------------------------------------------------------------
-- Optimization Runs
-- PTOF optimization log.
-- One optimization run usually belongs to a user message.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS optimization_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  message_id UUID REFERENCES messages(id) ON DELETE SET NULL,

  original_prompt TEXT NOT NULL,
  optimized_prompt TEXT,
  final_prompt TEXT,

  prompt_type TEXT,
  complexity BOOLEAN,
  format_rule TEXT,
  token_before INTEGER,
  token_after INTEGER,
  tokens_saved INTEGER,
  reduction_percent NUMERIC(6, 2),

  preset_id UUID REFERENCES presets(id) ON DELETE SET NULL,
  provider_id TEXT,
  model_id TEXT,

  notes JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Provider Runs
-- LLM/provider execution log.
-- One provider run usually belongs to an assistant message.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS provider_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  optimization_run_id UUID REFERENCES optimization_runs(id) ON DELETE SET NULL,

  provider_id TEXT NOT NULL,
  model_id TEXT,

  status TEXT NOT NULL DEFAULT 'success', -- success | failed | skipped
  response_text TEXT,
  error_code TEXT,
  error_message TEXT,

  latency_ms INTEGER,
  input_tokens INTEGER,
  output_tokens INTEGER,
  total_tokens INTEGER,

  raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT provider_runs_status_check CHECK (status IN ('success', 'failed', 'skipped'))
);

-- ------------------------------------------------------------
-- Helpful indexes
-- ------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_provider_id ON sessions(provider_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_last_activity_at ON sessions(last_activity_at);

CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

CREATE INDEX IF NOT EXISTS idx_optimization_runs_session_id ON optimization_runs(session_id);
CREATE INDEX IF NOT EXISTS idx_optimization_runs_message_id ON optimization_runs(message_id);
CREATE INDEX IF NOT EXISTS idx_optimization_runs_provider_id ON optimization_runs(provider_id);

CREATE INDEX IF NOT EXISTS idx_provider_runs_session_id ON provider_runs(session_id);
CREATE INDEX IF NOT EXISTS idx_provider_runs_message_id ON provider_runs(message_id);
CREATE INDEX IF NOT EXISTS idx_provider_runs_provider_id ON provider_runs(provider_id);

CREATE INDEX IF NOT EXISTS idx_provider_connections_user_id ON provider_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_provider_connections_provider_id ON provider_connections(provider_id);