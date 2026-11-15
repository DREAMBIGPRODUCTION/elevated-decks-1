/** Encode each path segment so files with spaces work on Vercel/Linux. */
export function mediaPath(path: string): string {
  return path
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : segment))
    .join("/")
}
