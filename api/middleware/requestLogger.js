import { recordRequest }
  from "../../analytics/requestMetrics.js";

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - start;

    recordRequest({
      route: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
      provider: req.execution?.provider,
    });

    console.log(
      JSON.stringify({
        requestId: req.requestId,
        method: req.method,
        route: req.originalUrl,
        statusCode: res.statusCode,
        provider: req.execution?.provider || null,
        executionStatus:
          req.execution?.executionStatus || null,
        providerStatus:
          req.execution?.providerStatus || null,
        durationMs,
        timestamp: new Date().toISOString(),
      })
    );
  });

  next();
}