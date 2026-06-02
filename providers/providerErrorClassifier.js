export function classifyProviderError(error) {
  const message = error?.message || "";
  const code = error?.code || "";
  const type = error?.type || "";

  const combined = `${message} ${code} ${type}`.toLowerCase();

  if (
    combined.includes("invalid_api_key") ||
    combined.includes("incorrect api key") ||
    combined.includes("401")
  ) {
    return "misconfigured";
  }

  if (
    combined.includes("insufficient_quota") ||
    combined.includes("quota") ||
    combined.includes("429")
  ) {
    return "quota_exceeded";
  }

  if (
    combined.includes("timed out") ||
    combined.includes("timeout") ||
    combined.includes("econnrefused") ||
    combined.includes("network")
  ) {
    return "offline";
  }

  return "unknown";
}