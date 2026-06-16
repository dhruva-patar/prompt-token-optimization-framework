import { listProvidersFromDb } from "./provider.repository.js";

const providers = await listProvidersFromDb();

console.log(JSON.stringify(providers, null, 2));