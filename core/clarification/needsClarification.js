export function needsClarification(prompt, type) {
  const text = prompt.toLowerCase();

  if (type === "Analytical") {
    const hasVagueReference =
      /\b(this|it|these|that|above|attached|uploaded|shared)\b/.test(text);

    const referencesExternalInput =
      /\b(uploaded|attached|file|document|sheet|spreadsheet|csv|pdf|report)\b/.test(text);

    const hasConcreteData =
      /\d/.test(text) ||
      /\b(table|rows|columns|dataset|json|csv data|metrics:|results:|logs:)\b/.test(text);

    if ((hasVagueReference || referencesExternalInput) && !hasConcreteData) {
      return true;
    }
  }

  return false;
}