"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileUp, Type, Loader2 } from "lucide-react"
import type { GradeResult } from "./result-panel"
import { useAuth } from "@/components/auth-context"
import { LoginGateDialog } from "@/components/login-gate-dialog"

type Props = {
  defaultApiKey?: string
  onResult?: (result: GradeResult) => void
  compact?: boolean
}

export function UploadBox({ defaultApiKey = "", onResult, compact = false }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [essayText, setEssayText] = useState("")
  const [apiKey, setApiKey] = useState(defaultApiKey)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tip, setTip] = useState<string | null>(null)
  const [mode, setMode] = useState<"file" | "paste">("file")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { user } = useAuth()
  const [showGate, setShowGate] = useState(false)

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("stargrader_gemini_key") : null
    if (saved && !apiKey) setApiKey(saved)
  }, [])

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const f = e.dataTransfer.files?.[0]
    if (f) {
      setFile(f)
      setTip(null)
    }
  }, [])

  const prevent = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setTip(null)
    }
  }

  const canSubmit = !!file || !!essayText.trim()

  const handleSubmit = async () => {
    setError(null)
    setTip(null)
    if (!user) {
      setShowGate(true)
      return
    }
    onResult?.(null as unknown as GradeResult)
    if (!canSubmit) {
      setError("Please upload a file or paste your essay text.")
      return
    }
    if (file && file.size > 10 * 1024 * 1024) {
      setError("File too large. Please keep under 10MB.")
      return
    }
    setIsLoading(true)
    try {
      const form = new FormData()
      if (file) form.append("file", file)
      if (essayText.trim()) form.append("text", essayText.trim())
      if (apiKey.trim()) form.append("apiKey", apiKey.trim())
      const res = await fetch("/api/grade", { method: "POST", body: form })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Failed to grade essay.")
      }
      const data = (await res.json()) as GradeResult
      onResult?.(data)
      if (apiKey.trim()) {
        localStorage.setItem("stargrader_gemini_key", apiKey.trim())
      }
      if (data.meta?.extractionWarning) setTip(data.meta.extractionWarning)
    } catch (e: any) {
      setError(e.message || "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  if (compact) {
    return (
      <Card className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur text-white">
        <div
          className="pointer-events-none absolute -inset-0.5 rounded-[18px] opacity-60 blur-xl"
          style={{
            background: "radial-gradient(60% 80% at 70% 30%, rgba(187,222,251,0.25), rgba(187,222,251,0) 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative p-5">
          <div className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-black/40 p-1">
            <button
              type="button"
              onClick={() => setMode("file")}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                mode === "file" ? "bg-white text-black" : "text-neutral-300 hover:text-white"
              }`}
              aria-pressed={mode === "file"}
            >
              {"File"}
            </button>
            <button
              type="button"
              onClick={() => setMode("paste")}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                mode === "paste" ? "bg-white text-black" : "text-neutral-300 hover:text-white"
              }`}
              aria-pressed={mode === "paste"}
            >
              {"Paste"}
            </button>
          </div>

          {mode === "file" ? (
            <div className="space-y-3">
              <label
                onDragEnter={prevent}
                onDragOver={prevent}
                onDragLeave={prevent}
                onDrop={onDrop}
                htmlFor="tiny-file"
                className="group flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-white/10 bg-neutral-950/80 px-4 py-7 text-center transition-colors hover:bg-neutral-900"
              >
                <FileUp className="h-5 w-5 text-neutral-400" />
                <div className="text-xs text-neutral-300">{"Drop PDF/DOCX or click to choose"}</div>
                <Input
                  ref={fileInputRef}
                  id="tiny-file"
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={onSelectFile}
                />
              </label>
              {file && (
                <div className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-2 text-[11px] text-neutral-200">
                  {"Selected: "} <span className="font-medium">{file.name}</span>
                  <button
                    type="button"
                    className="ml-2 underline underline-offset-2 text-neutral-300 hover:text-white"
                    onClick={() => document.getElementById("tiny-file")?.dispatchEvent(new Event("click"))}
                  >
                    {"Change"}
                  </button>
                  <button
                    type="button"
                    className="ml-2 underline underline-offset-2 text-neutral-300 hover:text-white"
                    onClick={() =>
                      fileInputRef.current ? ((fileInputRef.current.value = ""), setFile(null)) : setFile(null)
                    }
                  >
                    {"Remove"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <Type className="h-3.5 w-3.5" />
                <span>{"Paste your essay"}</span>
              </div>
              <Textarea
                placeholder={"Paste here…"}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                className="min-h-[128px] resize-y bg-black/60 border-white/10 text-sm text-white placeholder:text-neutral-500"
              />
            </div>
          )}

          {error && (
            <div className="mt-3">
              <Alert variant="destructive" className="border-red-500/40 bg-red-950/40 text-red-200">
                <AlertTitle className="text-xs">{"Error"}</AlertTitle>
                <AlertDescription className="whitespace-pre-wrap text-xs">{error}</AlertDescription>
              </Alert>
            </div>
          )}
          {tip && (
            <div className="mt-3">
              <Alert className="border-white/10 bg-neutral-950 text-neutral-200">
                <AlertTitle className="text-xs">{"Heads up"}</AlertTitle>
                <AlertDescription className="whitespace-pre-wrap text-xs">{tip}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between">
            <div className="text-[11px] text-neutral-500">{"PDF • DOCX • TXT"}</div>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
              className="h-9 px-3.5 text-sm bg-[#BBDEFB] hover:bg-[#A7D3FA] text-black disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  {"Grading"}
                </>
              ) : (
                "Grade"
              )}
            </Button>
          </div>
        </div>
        <LoginGateDialog open={showGate} onOpenChange={setShowGate} />
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl border-white/10 bg-neutral-900/70 backdrop-blur shadow-sm text-white overflow-hidden min-h-[260px]">
      <div className="relative h-10">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 20%), radial-gradient(1200px 200px at 10% 50%, rgba(187,222,251,0.22), rgba(187,222,251,0) 60%), radial-gradient(1200px 220px at 90% 50%, rgba(187,222,251,0.18), rgba(187,222,251,0) 60%)",
          }}
        />
        <div className="absolute inset-0 [mask-image:linear-gradient(to-bottom,white,transparent)]" />
      </div>
      <div className="p-6 space-y-6">
        <div className="rounded-2xl border border-dashed border-white/10 bg-neutral-950 hover:bg-neutral-900 transition-colors">
          <label
            onDragEnter={prevent}
            onDragOver={prevent}
            onDragLeave={prevent}
            onDrop={onDrop}
            htmlFor="file"
            className="flex cursor-pointer flex-col items-center justify-center gap-3 px-6 py-10 text-center"
          >
            <FileUp className="h-6 w-6 text-neutral-400" />
            <div className="text-sm text-neutral-200">{"Drop PDF/DOCX or click"}</div>
            <div className="text-xs text-neutral-400">{"Max 10MB • .pdf .docx"}</div>
            <Input
              ref={fileInputRef}
              id="file"
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={onSelectFile}
            />
          </label>
          {file && (
            <div className="border-t border-white/10 px-4 py-3 text-sm text-neutral-200">
              {"Selected: "} <span className="font-medium">{file.name}</span>
              <button
                className="ml-2 text-neutral-300 hover:text-white underline underline-offset-4"
                onClick={() => document.getElementById("file")?.dispatchEvent(new Event("click"))}
                type="button"
              >
                {"Change"}
              </button>
              <button
                className="ml-2 text-neutral-300 hover:text-white underline underline-offset-4"
                onClick={() =>
                  fileInputRef.current ? ((fileInputRef.current.value = ""), setFile(null)) : setFile(null)
                }
                type="button"
              >
                {"Remove"}
              </button>
            </div>
          )}
        </div>

        <Textarea
          placeholder={"Paste here…"}
          value={essayText}
          onChange={(e) => setEssayText(e.target.value)}
          className="min-h-[200px] md:min-h-[240px] resize-y bg-black/60 border-white/10 text-white placeholder:text-neutral-500"
        />

        {error && (
          <Alert variant="destructive" className="border-red-500/40 bg-red-950/40 text-red-200">
            <AlertTitle>{"Error"}</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">{error}</AlertDescription>
          </Alert>
        )}
        {tip && (
          <Alert className="border-white/10 bg-neutral-950 text-neutral-200">
            <AlertTitle>{"Heads up"}</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">{tip}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-3">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            className="bg-[#BBDEFB] hover:bg-[#A7D3FA] text-black"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {"Grading..."}
              </>
            ) : (
              "Grade"
            )}
          </Button>
          <span className="text-xs text-neutral-400">{"PDF • DOCX • TXT"}</span>
        </div>
      </div>
      <LoginGateDialog open={showGate} onOpenChange={setShowGate} />
    </Card>
  )
}
