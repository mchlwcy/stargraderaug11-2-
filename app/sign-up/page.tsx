"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Background } from "@/components/background"
import { Reveal } from "@/components/reveal"
import { MessageCircle } from "lucide-react"

const WHATSAPP_MESSAGE = "Hi! I would like to know more about StarGrader."
const WHATSAPP_URL = `https://wa.me/85268718291?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export default function RequestAccessPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open WhatsApp with prefilled text. Do NOT create account here.
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
    setSent(true)
  }

  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <Background />
      <Navbar />
      <main className="flex-1 px-4 md:px-8">
        <div className="mx-auto max-w-md pt-20 md:pt-28 pb-10 md:pb-16">
          <Reveal>
            <Card className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl text-white">Request access</CardTitle>
              </CardHeader>
              <CardContent>
                {!sent ? (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="bg-black/60 border-white/10 text-white placeholder:text-neutral-500"
                        required
                      />
                    </div>
                    <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-neutral-300">
                      Accounts are approved manually. We’ll grant access after reviewing your request.
                    </div>
                    <Button type="submit" className="w-full bg-[#BBDEFB] text-black hover:bg-[#A7D3FA]">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact us on WhatsApp
                    </Button>
                    <div className="text-xs text-neutral-400 text-center">
                      WhatsApp message will be prefilled with: “{WHATSAPP_MESSAGE}”
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-neutral-200">
                      Thanks! A WhatsApp chat opened in a new tab. We’ll get back to you shortly.
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button asChild className="w-full bg-[#BBDEFB] text-black hover:bg-[#A7D3FA]">
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                          Open WhatsApp again
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="secondary"
                        className="w-full bg-neutral-900 text-white hover:bg-neutral-800"
                      >
                        <Link href="/">Back to home</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  )
}
