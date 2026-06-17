import "dotenv/config";
import {
  executeProviderPrompt,
  listProviders,
  listProvidersDetailed,
} from "./providerRunner.js";

async function run() {
  console.log("Available providers:", await listProviders());
console.log("Provider metadata:", await listProvidersDetailed());


  const result = await executeProviderPrompt({
    providerId: "openai",
    modelId: process.env.OPENAI_DEFAULT_MODEL || "gpt-4o-mini",
    finalPrompt: "Explain PTOF in one sentence.",
  });

  console.log(JSON.stringify(result, null, 2));

  console.log("Provider result:");
  console.log(JSON.stringify(result, null, 2));
  }



run().catch(console.error);