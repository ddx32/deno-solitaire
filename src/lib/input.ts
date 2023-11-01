export function getPromptArguments(input: string) {
  const normalized = input.trim().replace(/\s+/g, " ");
  return normalized.split(" ");
}
