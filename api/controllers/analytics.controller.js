import { getMetrics }
  from "../../analytics/requestMetrics.js";

import { sendSuccess }
  from "../utils/sendResponse.js";

export function analyticsController(
  req,
  res
) {
  return sendSuccess(
    res,
    req,
    getMetrics()
  );
}