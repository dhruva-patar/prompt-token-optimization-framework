import { listPresets } from "../../presets/presetRegistry.js";
import { sendSuccess } from "../utils/sendResponse.js";

export function presetController(req, res) {
  const providerType = req.query.providerType;

  return sendSuccess(res, req, {
    presets: listPresets({ providerType }),
  });
}