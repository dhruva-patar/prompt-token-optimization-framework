# PTOF Phase 9 DB Schema Plan

## Purpose

Phase 9 introduces database persistence for PTOF.

The goal is to support durable product usage across sessions, providers, messages, and optimization runs without overbuilding full SaaS infrastructure too early.

This schema plan is intentionally scoped.

It should support the current PTOF product flow first, then leave room for future expansion.

---

## Phase 9 Scope Decision

Phase 9 should persist the core product flow required for:

- chat/session continuity
- provider selection and usage
- message history
- optimization run history
- optimization input/output details

Phase 9 should not attempt to model every future SaaS need.

---

## Included in Phase 9

The initial schema should include:

```txt
Users
Workspaces / Projects
Chat Sessions
Messages
Providers
Optimization Runs
Optimization Details
Session Provider Context