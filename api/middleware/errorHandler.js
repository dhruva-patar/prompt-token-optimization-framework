import { sendError } from "../utils/sendResponse.js";

export function errorHandler(err, req, res, next) {
  console.error(err);

  return sendError(
    res,
    err.message || "Internal Server Error",
    err.status || 500
  );
}