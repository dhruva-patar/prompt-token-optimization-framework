# PTOF SDK Layer

SDKs provide client access to the PTOF API.

## Core Rule

SDKs must call PTOF API endpoints.

SDKs must NOT:
- reimplement optimization logic
- modify prompts directly
- duplicate core behavior
- bypass benchmark contracts

## Planned SDKs

- JavaScript
- Python

## Current API Base

```text
/v1/optimize
/v1/classify
/v1/benchmark