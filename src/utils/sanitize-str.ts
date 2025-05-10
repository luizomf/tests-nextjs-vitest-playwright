export function sanitizeStr(s: string): string {
  return !s || typeof s !== 'string' ? '' : s.trim().normalize();
}
