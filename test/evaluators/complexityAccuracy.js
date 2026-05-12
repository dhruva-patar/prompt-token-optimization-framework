export default function evaluateComplexityAccuracy(result, expected) {
  const actual = Boolean(result.complex);
  const expectedValue = Boolean(expected.complex);

  return {
    status: actual === expectedValue ? "PASS" : "FAIL",
    expected: expectedValue,
    actual,
  };
}
