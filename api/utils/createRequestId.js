import crypto from "crypto";

export function createRequestId() {
  return `req_${crypto.randomBytes(6).toString("hex")}`;
}