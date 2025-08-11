"use client"

import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function LoginGateDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-950 text-neutral-100">
        <DialogHeader>
          <DialogTitle className="text-white">Please sign in</DialogTitle>
          <DialogDescription className="text-neutral-300">
            Log in or request access to grade your essay.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-2">
          <Button asChild className="w-full bg-[#BBDEFB] text-black hover:bg-[#A7D3FA]">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild variant="secondary" className="w-full bg-neutral-900 text-white hover:bg-neutral-800">
            <Link href="/sign-up">Request access</Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full text-neutral-300 hover:text-white"
            onClick={() => onOpenChange(false)}
          >
            Not now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
