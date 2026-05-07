function evaluateTypeAccuracy(result, expected) {
  const actual = result.type;
  const expectedType = expected.type;

  return {
    status: actual === expectedType ? "PASS" : "FAIL",
    expected: expectedType,
    actual,
  };
}

module.exports = evaluateTypeAccuracy;