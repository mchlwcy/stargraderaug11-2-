import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export type GradeResult = {
  grade: string
  score: number
  level: string
  summary: string
  strengths: string[]
  improvements: string[]
  rubric: {
    content: number
    organisation: number
    language: number
    style: number
    mechanics: number
    comments: string
  }
  inlineFeedback: string
  meta?: {
    extractionWarning?: string
    model?: string
  }
}

export function ResultPanel({ result }: { result: GradeResult }) {
  const r = result || {
    grade: "—",
    score: 0,
    level: "—",
    summary: "",
    strengths: [],
    improvements: [],
    rubric: { content: 0, organisation: 0, language: 0, style: 0, mechanics: 0, comments: "" },
    inlineFeedback: "",
    meta: { model: "" },
  }

  return (
    <div className="grid gap-6 md:grid-cols-5 text-white">
      <Card className="md:col-span-2 rounded-2xl border-white/10 bg-neutral-900/70 backdrop-blur shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-white">{"Overview"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-4xl font-semibold tracking-tight">
            {r.score}
            {"/"}100
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full bg-neutral-800 text-neutral-200">
              {r.level}
            </Badge>
            <span className="text-neutral-300 text-sm">{r.grade}</span>
          </div>
          <p className="text-neutral-200 text-sm">{r.summary}</p>
          {r.meta?.model && (
            <div className="text-xs text-neutral-400">
              {"Model: "}
              {r.meta.model}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-3 rounded-2xl border-white/10 bg-neutral-900/70 backdrop-blur shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-white">{"Rubric breakdown"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Metric label="Content" value={r.rubric.content} />
            <Metric label="Organisation" value={r.rubric.organisation} />
            <Metric label="Language" value={r.rubric.language} />
            <Metric label="Style" value={r.rubric.style} />
            <Metric label="Mechanics" value={r.rubric.mechanics} />
          </div>
          <p className="text-sm text-neutral-200">{r.rubric.comments}</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-5 rounded-2xl border-white/10 bg-neutral-900/70 backdrop-blur shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-white">{"Strengths"}</CardTitle>
        </CardHeader>
        <CardContent>
          {r.strengths?.length ? (
            <ul className="list-disc pl-5 text-sm text-neutral-200 space-y-2">
              {r.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-neutral-400">{"No strengths found."}</div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-5 rounded-2xl border-white/10 bg-neutral-900/70 backdrop-blur shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-white">{"Areas to improve"}</CardTitle>
        </CardHeader>
        <CardContent>
          {r.improvements?.length ? (
            <ul className="list-disc pl-5 text-sm text-neutral-200 space-y-2">
              {r.improvements.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-neutral-400">{"No improvements found."}</div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-5 rounded-2xl border-white/10 bg-neutral-900/70 backdrop-blur shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-white">{"Inline feedback"}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap break-words text-sm text-neutral-200">{r.inlineFeedback}</pre>
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  const v = Math.max(0, Math.min(10, value || 0))
  return (
    <div className="rounded-xl border border-white/10 p-4 bg-neutral-950/50">
      <div className="text-sm text-neutral-300">{label}</div>
      <div className="mt-2 h-2 w-full rounded-full bg-neutral-800">
        <div className="h-2 rounded-full bg-[#BBDEFB]" style={{ width: `${v * 10}%` }} />
      </div>
      <div className="mt-2 text-sm text-neutral-200">
        {v}
        {"/"}10
      </div>
    </div>
  )
}
