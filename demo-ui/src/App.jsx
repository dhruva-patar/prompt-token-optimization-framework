import { useState } from "react";
import { optimizePrompt, estimateTokens } from "../../core/optimizer.js";
import { RESPONSE_MODE_OPTIONS } from "../../core/responseModes/responseModeMap.js";
import "./App.css";

export default function App() {
  const [rawPrompt, setRawPrompt] = useState("");
  const [responseMode, setResponseMode] = useState("default");

  const result = optimizePrompt(rawPrompt, {
    responseMode,
  });

  const optimizedPrompt =
    result.clarify || result.finalPrompt || result.compressedPrompt || "";

  const beforeTokens = estimateTokens(rawPrompt);
  const afterTokens = estimateTokens(optimizedPrompt);
  const tokenDelta = beforeTokens - afterTokens;

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
          <h2>Raw Prompt</h2>

          <textarea
            value={rawPrompt}
            onChange={(e) => setRawPrompt(e.target.value)}
            placeholder="Enter your prompt..."
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
          <h2>Optimized Prompt</h2>

          <textarea
            readOnly
            value={optimizedPrompt}
            placeholder="Optimized prompt will appear here..."
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
