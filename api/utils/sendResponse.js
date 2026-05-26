export function sendSuccess(res, result, meta = {}) {
  return res.json({
    success: true,
    result,
    meta,
  });
}

export function sendError(res, message, statusCode = 500, meta = {}) {
  return res.status(statusCode).json({
    success: false,
    error: message,
    meta,
  });
}