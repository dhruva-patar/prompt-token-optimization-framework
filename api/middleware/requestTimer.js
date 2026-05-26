export function requestTimer(req, res, next) {
  req.startTime = Date.now();
  next();
}