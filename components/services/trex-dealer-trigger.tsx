"use client"

import { useState } from "react"
import { TrexDealerModal } from "@/components/services/trex-dealer-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

type TrexDealerTriggerProps = {
  dark?: boolean
  className?: string
}

export function TrexDealerTrigger({ dark = false, className }: TrexDealerTriggerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        type="button"
        size="lg"
        className={cn(
          "h-12 px-6",
          dark
            ? "bg-accent hover:bg-accent/90 text-accent-foreground"
            : "bg-primary hover:bg-primary/90 text-primary-foreground",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Explore Trex Products
      </Button>
      <TrexDealerModal open={open} onOpenChange={setOpen} />
    </>
  )
}