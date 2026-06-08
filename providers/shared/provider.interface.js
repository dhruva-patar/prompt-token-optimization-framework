/**
 * PTOF Provider Contract
 *
 * Provider adapters must consume optimized PTOF output.
 * Provider adapters must NOT modify PTOF core optimization logic.
 *
 * Expected provider response shape:
 *
 * {
 *   provider: string,
 *   model: string,
 *   output: string,
 *   usage: {
 *     inputTokens?: number,
 *     outputTokens?: number,
 *     totalTokens?: number
 *   },
 *   latencyMs: number,
 *   raw?: unknown
 * }
 */

export function normalizeProviderResponse({
  provider,
  model,
  output,
  usage = null,
  latencyMs = null,
  raw = null,
}) {
  return {
    success: true,
    providerId: provider,
    modelId: model,
    responseText: output,
    latencyMs,
    usage,
    error: null,
    raw,
  };
}