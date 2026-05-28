export function setExecutionContext(req, updates = {}) {
  req.execution = {
    ...(req.execution || {}),
    ...updates,
  };
}