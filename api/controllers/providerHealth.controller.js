import { sendSuccess } from "../utils/sendResponse.js";
import { listProviderMetadataFromSource } from "../../providers/provider.service.js";
import { enrichProviderRuntimeHealth } from "../../providers/providerRuntimeHealth.service.js";

export async function providerHealthController(req, res) {
  const providerMetadata = await listProviderMetadataFromSource();

  const providers = await Promise.all(
    providerMetadata.map((provider) =>
      enrichProviderRuntimeHealth(provider)
    )
  );

  return sendSuccess(res, req, {
    providers,
  });
}