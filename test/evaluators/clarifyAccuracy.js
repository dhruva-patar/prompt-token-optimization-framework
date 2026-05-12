export default function evaluateClarifyAccuracy(result, expected) {
  const actual = Boolean(result.shouldClarify);
  const expectedValue = Boolean(expected.shouldClarify);

  return {
    status: actual === expectedValue ? "PASS" : "FAIL",
    expected: expectedValue,
    actual,
  };
}
