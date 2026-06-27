"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { PackagePdfOutlineItem } from "@/lib/package-pdf-types"
import { ChevronDown, List } from "lucide-react"

type PdfTocMenuProps = {
  outline: PackagePdfOutlineItem[]
  disabled?: boolean
  onNavigate: (dest: unknown) => void
  onOpenChange?: (open: boolean) => void
}

function TocMenuItems({
  items,
  onNavigate,
}: {
  items: PackagePdfOutlineItem[]
  onNavigate: (dest: unknown) => void
}) {
  return items.map((item, index) => {
    const key = `${item.title}-${index}`

    if (item.items?.length) {
      return (
        <DropdownMenuSub key={key}>
          <DropdownMenuSubTrigger className="max-w-[280px] truncate">
            {item.title}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-[60vh] overflow-y-auto">
            <TocMenuItems items={item.items} onNavigate={onNavigate} />
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      )
    }

    return (
      <DropdownMenuItem
        key={key}
        className="max-w-[280px] truncate"
        disabled={!item.dest}
        onClick={() => item.dest && onNavigate(item.dest)}
      >
        {item.title}
      </DropdownMenuItem>
    )
  })
}

export function PdfTocMenu({
  outline,
  disabled = false,
  onNavigate,
  onOpenChange,
}: PdfTocMenuProps) {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-10 max-w-[220px] rounded-full px-3 sm:max-w-none sm:px-4"
          disabled={disabled || outline.length === 0}
        >
          <List className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">Table of Contents</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-72 max-h-[min(70vh,28rem)] overflow-y-auto"
      >
        <DropdownMenuLabel>Table of Contents</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {outline.length > 0 ? (
          <TocMenuItems items={outline} onNavigate={onNavigate} />
        ) : (
          <DropdownMenuItem disabled>No sections found in this guide</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}