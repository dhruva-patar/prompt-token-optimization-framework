import {
  runProvider,
  listProviders,
  listProvidersDetailed,
} from "./providerRunner.js";

async function run() {
  console.log("Available providers:", listProviders());

  console.log(
    "Provider metadata:",
    listProvidersDetailed()
  );

  try {
    const result = await runProvider({
      provider: "openai",
      prompt:
        "Compare GPT and Claude for code review.",
    });

    console.log("Provider result:");
    console.log(result);
  } catch (error) {
    console.log("Provider execution failed:");
    console.log(error.message);
  }
}

run().catch(console.error);