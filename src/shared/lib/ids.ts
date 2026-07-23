export function shortId(id: string) {
  return id.replace(/^[^-]+-/, "").slice(0, 8);
}
