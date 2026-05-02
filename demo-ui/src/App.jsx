import { useState } from "react";
import { optimizePrompt, estimateTokens } from "./lib/ptof.js";

export default function App() {
  const [rawPrompt, setRawPrompt] = useState("");

  const result = optimizePrompt(rawPrompt);
  const before = estimateTokens(rawPrompt);
  const after = estimateTokens(result.compressedPrompt);
  const reduction = before ? Math.round(((before - after) / before) * 100) : 0;
  const savedTokens = before - after;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>PTOF Prompt Compression Agent</h1>

      <label><strong>Raw Prompt</strong></label>
      <textarea
        placeholder="Paste raw prompt..."
        value={rawPrompt}
        onChange={(e) => setRawPrompt(e.target.value)}
        rows={8}
        style={{ width: "100%", marginTop: "8px", marginBottom: "24px", padding: "12px" }}
      />

      <label><strong>Optimized Prompt</strong></label>
      <textarea
        value={result.compressedPrompt}
        readOnly
        rows={14}
        style={{ width: "100%", marginTop: "8px", padding: "12px" }}
      />

      <p><strong>Task type:</strong> {result.taskType}</p>
      <div style={{ marginTop: "24px", padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h3>Token Awareness</h3>

        <p><strong>Before:</strong> {before} tokens</p>
        <p><strong>After:</strong> {after} tokens</p>
        <p><strong>Saved:</strong> {savedTokens} tokens</p>
        <p><strong>Reduction:</strong> {reduction}%</p>
      </div>

      <h3>Notes</h3>
      <ul>
        {result.notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
