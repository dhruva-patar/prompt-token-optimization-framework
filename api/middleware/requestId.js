import { createRequestId } from "../utils/createRequestId.js";

export function requestId(req, res, next) {
  req.requestId = createRequestId();
  next();
}