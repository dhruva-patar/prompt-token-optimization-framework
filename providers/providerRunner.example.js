import { runProvider, listProviders } from "./providerRunner.js";

async function run() {
  console.log("Available providers:", listProviders());

  const result = await runProvider({
    provider: "openai",
    prompt: "Compare GPT and Claude for code review.",
  });

  console.log(result);
}

run();