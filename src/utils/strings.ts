export const caseInsensitiveCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { sensitivity: 'base' });
