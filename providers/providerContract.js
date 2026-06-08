export function createProviderSuccess({
  providerId,
  modelId,
  responseText,
  latencyMs = null,
  usage = null,
  raw = null
}) {
  return {
    success: true,
    providerId,
    modelId,
    responseText,
    latencyMs,
    usage,
    error: null,
    raw
  };
}

export function createProviderError({
  providerId,
  modelId,
  message,
  code = "PROVIDER_ERROR",
  latencyMs = null,
  raw = null
}) {
  return {
    success: false,
    providerId,
    modelId,
    responseText: null,
    latencyMs,
    usage: null,
    error: {
      code,
      message
    },
    raw
  };
}