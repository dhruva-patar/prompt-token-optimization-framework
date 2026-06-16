import { listProviderMetadataFromSource } from "./provider.service.js";

const providers = await listProviderMetadataFromSource();

console.log(JSON.stringify(providers, null, 2));