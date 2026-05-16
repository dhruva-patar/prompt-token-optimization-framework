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

  const beforeTokens = estimateTokens(rawPrompt);
  const afterTokens = estimateTokens(result.compressedPrompt || "");
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
          </div>

          <p className="meta">Estimated tokens: {beforeTokens}</p>
        </div>

        <div className="card">
          <h2>Optimized Prompt</h2>

          <textarea
            readOnly
            value={result.clarify || result.compressedPrompt}
            placeholder="Optimized prompt will appear here..."
          />

          <div className="details">
            {result.responseMode?.displayName && (
              <p>
                <strong>Selected Mode:</strong>{" "}
                {result.responseMode.displayName}
              </p>
            )}

            {result.formatRule && (
              <p>
                <strong>Format Rule:</strong> {result.formatRule}
              </p>
            )}

            <p>
              <strong>Type:</strong> {result.type}
            </p>

            <p>
              <strong>Complex:</strong> {result.complex ? "Yes" : "No"}
            </p>

            {result.clarify && (
              <p>
                <strong>Clarify:</strong> {result.clarify}
              </p>
            )}

            {result.notes?.length > 0 && (
              <p>
                <strong>Notes:</strong> {result.notes.join(", ")}
              </p>
            )}

            <p>
              <strong>Token Estimate:</strong> {beforeTokens} → {afterTokens}
              {rawPrompt &&
                ` (${tokenDelta >= 0 ? "-" : "+"}${Math.abs(
                  tokenDelta
                )} tokens)`}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
