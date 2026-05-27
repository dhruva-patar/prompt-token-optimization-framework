import OpenAI from "openai";
import { env } from "../../../config/env.js";
import { normalizeProviderResponse } from "../../shared/provider.interface.js";

export async function runOpenAIProvider({
  prompt,
  model = env.openai.defaultModel,
  raw = null,
} = {}) {
  const start = Date.now();

  if (!prompt) {
    throw new Error("Optimized prompt is required for OpenAI provider");
  }

  if (!env.openai.apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const client = new OpenAI({
    apiKey: env.openai.apiKey,
  });

  /*const response = await client.responses.create({
    model,
    input: prompt,
  });

  const output = response.output_text || "";

  return normalizeProviderResponse({
    provider: "openai",
    model,
    output,
    usage: {
      inputTokens: response.usage?.input_tokens,
      outputTokens: response.usage?.output_tokens,
      totalTokens: response.usage?.total_tokens,
    },
    latencyMs: Date.now() - start,
    raw,
  });*/

  const response = await Promise.race([
    client.responses.create({
      model,
      input: prompt,
      max_output_tokens: 100,
    }),

    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("OpenAI provider request timed out")),
        15000
      )
    ),
  ]);
}