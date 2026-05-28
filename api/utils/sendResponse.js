function getDurationMs(req) {
  return req?.startTime ? Date.now() - req.startTime : null;
}


export function sendSuccess(res, req, result, meta = {}) {
  const durationMs = Date.now() - req.startTime;

  return res.json({
    success: true,
    result,
    meta: {
      version: "v1",
      timestamp: new Date().toISOString(),
      durationMs: getDurationMs(req) || 0,
      requestId: req.requestId,
      ...meta,
    },
  });
}

export function sendError(
  res,
  req,
  message,
  statusCode = 500,
  meta = {}
) {
  const durationMs = req?.startTime
    ? Date.now() - req.startTime
    : null;

  return res.status(statusCode).json({
    success: false,
    error: message,
    meta: {
      version: "v1",
      timestamp: new Date().toISOString(),
      durationMs: getDurationMs(req),
      requestId: req.requestId,
      ...meta,
    },
  });
}