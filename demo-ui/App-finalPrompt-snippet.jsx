// In demo-ui/src/App.jsx

// Replace:
value={result.clarify || result.compressedPrompt}

// With:
value={result.clarify || result.finalPrompt || result.compressedPrompt}

// Optional: add this in details metadata:
{result.responseEnhancementBlock && (
  <p>
    <strong>Applied Enhancement:</strong>{" "}
    {result.responseMode?.displayName}
  </p>
)}
