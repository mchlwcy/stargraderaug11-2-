"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Background } from "@/components/background"
import { Reveal } from "@/components/reveal"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try {
      if (!email.trim()) throw new Error("Email required.")
      await login(email, password)
      router.push("/")
    } catch (e: any) {
      setErr(e?.message || "Failed to log in.")
    } finally {
      setLoading(false)
    }
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
                <CardTitle className="text-xl text-white">Log in</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-black/60 border-white/10 text-white placeholder:text-neutral-500"
                    />
                  </div>
                  {err && <p className="text-sm text-red-300">{err}</p>}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#BBDEFB] text-black hover:bg-[#A7D3FA]"
                  >
                    {loading ? "Signing in…" : "Log in"}
                  </Button>
                  <p className="text-xs text-neutral-400">
                    Login is for approved accounts only. Need access?{" "}
                    <Link href="/sign-up" className="text-[#BBDEFB] hover:text-white underline underline-offset-4">
                      Request access
                    </Link>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  )
}
