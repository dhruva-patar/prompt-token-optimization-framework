import { useState } from "react";

function estimateTokens(text) {
  if (!text.trim()) return 0;
  return Math.ceil(text.trim().split(/\s+/).length * 1.3);
}

export default function App() {
  const [rawPrompt, setRawPrompt] = useState("");

  const compressed = rawPrompt
    .replace(/\b(hey|hi|hello|please|can you|could you|just|maybe)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const before = estimateTokens(rawPrompt);
  const after = estimateTokens(compressed);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>PTOF Prompt Compression Agent</h1>

      <textarea
        placeholder="Paste raw prompt..."
        value={rawPrompt}
        onChange={(e) => setRawPrompt(e.target.value)}
        rows={8}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <h3>Compressed Prompt</h3>
      <textarea value={compressed} readOnly rows={8} style={{ width: "100%" }} />

      <p>Before tokens: {before}</p>
      <p>After tokens: {after}</p>
    </div>
  );
}
