const metrics = {
  totalRequests: 0,
  successRequests: 0,
  failedRequests: 0,

  totalDurationMs: 0,

  routeUsage: {},
  providerUsage: {},
};

export function recordRequest({
  route,
  statusCode,
  durationMs,
  provider,
}) {
  metrics.totalRequests += 1;

  if (statusCode >= 200 && statusCode < 400) {
    metrics.successRequests += 1;
  } else {
    metrics.failedRequests += 1;
  }

  metrics.totalDurationMs += durationMs || 0;

  if (route) {
    metrics.routeUsage[route] =
      (metrics.routeUsage[route] || 0) + 1;
  }

  if (provider) {
    metrics.providerUsage[provider] =
      (metrics.providerUsage[provider] || 0) + 1;
  }
}

export function getMetrics() {
  return {
    ...metrics,

    averageDurationMs:
      metrics.totalRequests > 0
        ? Math.round(
            metrics.totalDurationMs /
              metrics.totalRequests
          )
        : 0,
  };
}