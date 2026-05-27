# PTOF Database Schema Plan

## Purpose

This document defines the future relational database structure for PTOF SaaS.

The database will store:
- users
- provider settings
- optimization history
- benchmark runs
- API usage
- macro presets

The database must NOT store core optimization logic.

---

# Core Rule

Optimization logic remains inside:

core/

The database stores configuration, history, usage, and user-specific settings only.

---

# Planned Tables

## users

Fields:
- id
- email
- name
- created_at
- updated_at

---

## api_keys

Fields:
- id
- user_id
- key_hash
- label
- is_active
- created_at
- last_used_at

---

## provider_list

Fields:
- id
- name
- label
- is_active
- created_at
- updated_at

---

## provider_connections

Fields:
- id
- user_id
- provider_id
- encrypted_api_key
- default_model
- is_enabled
- last_used_at
- created_at
- updated_at

---

## provider_runs

Fields:
- id
- user_id
- provider_id
- prompt_id
- model
- latency_ms
- input_tokens
- output_tokens
- total_tokens
- status
- created_at

---

## prompts

Fields:
- id
- user_id
- raw_prompt
- optimized_prompt
- prompt_type
- is_complex
- token_count
- created_at

---

## optimization_history

Fields:
- id
- prompt_id
- user_id
- compressed_prompt
- final_prompt
- format_rule
- notes
- clarify
- semantic_risk
- created_at

---

## benchmark_runs

Fields:
- id
- user_id
- pass_count
- warn_count
- fail_count
- total_count
- duration_ms
- created_at

---

## macro_presets

Fields:
- id
- user_id
- name
- macro_key
- instruction
- is_active
- created_at
- updated_at

---

# Relationships

- users.id → api_keys.user_id
- users.id → provider_connections.user_id
- users.id → prompts.user_id
- users.id → optimization_history.user_id
- users.id → benchmark_runs.user_id
- users.id → macro_presets.user_id

- provider_list.id → provider_connections.provider_id
- provider_list.id → provider_runs.provider_id

- prompts.id → optimization_history.prompt_id
- prompts.id → provider_runs.prompt_id

---

# Current Status

Database planning only.

No database implementation yet.
