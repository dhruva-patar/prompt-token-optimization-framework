import { useState } from "react";
import { optimizePrompt, estimateTokens } from "../../core/optimizer.js";
import { RESPONSE_MODE_OPTIONS } from "../../core/responseModes/responseModeMap.js";
import "./App.css";

const EXAMPLE_PROMPTS = [
  "Analyze whether this SaaS idea is viable for solo founders.",
  "Explain Kubernetes networking to a beginner.",
  "Challenge my assumptions about building an AI startup.",
];

export default function App() {
  const [rawPrompt, setRawPrompt] = useState("");
  const [responseMode, setResponseMode] = useState("default");

  const [copied, setCopied] = useState(false);

  const result = optimizePrompt(rawPrompt, {
    responseMode,
  });

  const optimizedPrompt =
    result.clarify || result.finalPrompt || result.compressedPrompt || "";

  const beforeTokens = estimateTokens(rawPrompt);
  const afterTokens = estimateTokens(optimizedPrompt);
  const tokenDelta = beforeTokens - afterTokens;

  /*const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(
      optimizedPrompt
    );
  } catch (err) {
    console.error("Copy failed", err);
  }
  };*/

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        optimizedPrompt
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);

    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <main className="app">
      <section className="hero">
        <h1>PTOF Prompt Optimization Agent</h1>

        <p>
          Deterministic prompt preprocessing for clearer, safer, and more
          structured LLM inputs.
        </p>

        <p className="mode">
          <strong>Mode:</strong> Safe — preserves semantic intent over
          aggressive token reduction.
        </p>
      </section>

      <section className="grid">
        <div className="card">
          
          <div className="card-header">
            <h2>Raw Prompt</h2>
            

            <button
              className="clear-button"
              onClick={() => setRawPrompt("")}
            >
              Clear
            </button>
          </div>

          <p className="example-label">
            Try it out:
          </p>
 
        <div className="example-prompts">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              className="example-chip"
              onClick={() => setRawPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

          <textarea
            className={!rawPrompt ? "empty-state" : ""}
            value={
              rawPrompt ||
              "Start typing..."
            }
          />

          <div className="response-mode-wrapper">
            <label className="field-label">Enhance Response</label>

            <select
              className="preset-select"
              value={responseMode}
              onChange={(e) => setResponseMode(e.target.value)}
            >
              {RESPONSE_MODE_OPTIONS.map((mode) => (
                <option key={mode.key} value={mode.key}>
                  {mode.displayName}
                </option>
              ))}
            </select>

            <p className="meta">
              Estimated tokens: {beforeTokens}
            </p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h2>Optimized Prompt</h2>

            <button
              className="copy-button"
              onClick={handleCopy}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            value={
              optimizedPrompt ||
              "PTOF will optimize and structure your prompt here."
            }
            className={!optimizedPrompt ? "empty-state" : ""}
          />

          <div className="details">
            <div className="details-row">
              <span>
                <strong>Selected Mode:</strong>{" "}
                {result.responseMode?.displayName || "Default"}
              </span>

              {result.formatRule && (
                <span>
                  <strong>Format Rule:</strong> {result.formatRule}
                </span>
              )}
            </div>

            <div className="details-row">
              <span>
                <strong>Type:</strong> {result.type}
              </span>

              <span>
                <strong>Complex:</strong> {result.complex ? "Yes" : "No"}
              </span>
            </div>

            {result.responseMode?.displayName && (
              <div className="details-row">
                <span>
                  <strong>Notes:</strong> {result.responseMode.displayName} applied
                </span>
              </div>
            )}

            <div className="details-row">
              <span>
                <strong>Token Estimate:</strong> {beforeTokens} → {afterTokens}
                {rawPrompt &&
                  ` (${tokenDelta >= 0 ? "-" : "+"}${Math.abs(
                    tokenDelta
                  )} tokens)`}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
