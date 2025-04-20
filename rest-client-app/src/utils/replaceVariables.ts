export function replaceVariables(
  str: string,
  variables: Record<string, string>,
  onMissing?: (key: string) => void
): string {
  return str.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    if (key in variables) {
      return variables[key];
    }

    onMissing?.(key);
    return `{{${key}}}`;
  });
}
