import { getProviderHealth } from "../../providers/providerHealth.js";
import { sendSuccess } from "../utils/sendResponse.js";

export async function providerHealthController(req, res) {
  const health = getProviderHealth();

  return sendSuccess(res, req, {
    providers: health,
  });
}