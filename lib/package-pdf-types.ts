export type PackagePdfOutlineItem = {
  title: string
  dest?: unknown
  items?: PackagePdfOutlineItem[]
}

type RawOutlineItem = {
  title: string
  dest?: unknown
  items?: RawOutlineItem[]
}

export function normalizePackagePdfOutline(
  outline: RawOutlineItem[] | null | undefined,
): PackagePdfOutlineItem[] {
  if (!outline?.length) return []

  return outline.map((item) => ({
    title: item.title || "Untitled",
    dest: item.dest,
    items: item.items?.length ? normalizePackagePdfOutline(item.items) : undefined,
  }))
}