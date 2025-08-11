export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { generateObject } from "ai"
import { google, createGoogleGenerativeAI } from "@ai-sdk/google"

const ResultSchema = z.object({
  grade: z.string().describe("A short textual grade summary, e.g., 'Excellent', 'Strong', 'Adequate'."),
  score: z.number().min(0).max(100).describe("Overall numeric score from 0-100."),
  level: z.string().describe("HKDSE performance level estimate: 5**, 5*, 5, 4, 3, etc."),
  summary: z.string().describe("3-5 sentences summarizing performance at a high level."),
  strengths: z.array(z.string()).describe("Bullet points of strengths."),
  improvements: z.array(z.string()).describe("Bullet points of targeted improvements with actionable phrasing."),
  rubric: z.object({
    content: z.number().min(0).max(10),
    organisation: z.number().min(0).max(10),
    language: z.number().min(0).max(10),
    style: z.number().min(0).max(10),
    mechanics: z.number().min(0).max(10),
    comments: z.string(),
  }),
  inlineFeedback: z.string().describe("Inline, quoted feedback with concrete rewrites/examples; may be markdown."),
})

const SYSTEM_INSTRUCTIONS = [
  "Role: You are a veteran HKDSE English marker. Assess essays strictly by DSE criteria for the 4 types (Argumentative, Narrative, Expository, Descriptive).",
  "Primary objective: Give short, surgical feedback focused on improvement only. Do NOT summarize the essay.",
  "Output mapping:",
  "- Keep 'summary' empty. Focus all improvement details in 'inlineFeedback' as well-structured Markdown (see Format below).",
  "- Keep 'strengths' minimal or empty if not essential. Prioritize improvements.",
  "Scoring rules (essential):",
  "- Provide a numeric score out of 100 ('score') and estimated HKDSE level ('level').",
  "- Rubric: content, organisation, language, style, mechanics (0-10 each).",
  "- Constraint: No rubric sub-score may differ by more than 2 points from any other (e.g., if Content=3 then others must be in [1..5], preferably [2..4]). Adjust to maintain internal consistency.",
  "Grammar threshold logic:",
  "- If grammatical mistakes > 20: Focus Language→Grammar. List and correct the problematic sentences. Ask the student to rewrite those sentences. Include corrected versions aligned with their original meaning.",
  "- If grammatical mistakes < 5: Focus on higher-level Language and Content (precision, nuance, cohesion).",
  "Essay type handling:",
  "- Detect the essay type (Argumentative, Narrative, Expository, Descriptive). Apply appropriate DSE expectations for content development and organization.",
  "Tone & style:",
  "- Be concise, specific, and directive. Avoid praise. Give concrete rewrites and examples with exact wording.",
  "Format (put ALL of this in 'inlineFeedback', in Markdown):",
  "### *****Content (X/7)*****",
  "- 3–6 bullets on exact gaps by paragraph reference (e.g., '(Paragraph 2)').",
  "- Include at least one 'Suggested improvement:' with a concrete rewrite.",
  "",
  "### *****Language (X/7)*****",
  "****Grammar and vocabulary issues:***",
  "1. Specific correction with before → after (reference paragraph).",
  "2. ...",
  "***Vocabulary enhancement:***",
  "- Suggest precise replacements with rationale.",
  "",
  "### *****Organization (X/7)*****",
  "- Comment on logical flow, paragraphing, topic sentences, cohesion.",
  "- Provide a suggested structure or transitions.",
  "",
  "### *****Overall Suggestions:*****",
  "1. 2–5 actionable items in priority order.",
  "",
  "*****Example of improved paragraph:*****",
  "Provide one improved paragraph that rewrites a weak section (clearly labeled).",
  "",
  "### Sample essay",
  "- Do NOT include a full sample essay by default. Write 'Available on request.'",
  "",
  "Additional constraints:",
  "- Use the same heading and emphasis style as shown above (asterisks and hashes).",
  "- Use British spelling where applicable.",
  "- If quoting the student’s sentence, keep it minimal and anonymised.",
].join(" ")

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const text = (formData.get("text") as string) || ""
    const file = formData.get("file") as File | null
    const pastedApiKey = (formData.get("apiKey") as string) || ""

    let essayText = text?.trim() || ""
    let extractionWarning: string | undefined = undefined

    if (!essayText && file) {
      const buf = Buffer.from(await file.arrayBuffer())

      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        const pdfModule = await import("pdf-parse")
        const pdfParse = (pdfModule as any).default ?? (pdfModule as any)
        const parsed = await pdfParse(buf)
        essayText = parsed.text?.trim() || ""
        if (!essayText) {
          extractionWarning =
            "No selectable text found in PDF. If this is a scanned document, please paste your essay text directly for best results."
        }
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.toLowerCase().endsWith(".docx")
      ) {
        const mammothModule = await import("mammoth")
        const extractRawText = (mammothModule as any).extractRawText ?? (mammothModule as any).default?.extractRawText
        const out = await extractRawText({ buffer: buf })
        essayText = out.value?.trim() || ""
        if (!essayText) {
          extractionWarning = "DOCX appears empty. Please ensure it contains text, or paste your essay directly."
        }
      } else if (file.type.startsWith("text/") || file.name.toLowerCase().endsWith(".txt")) {
        essayText = buf.toString("utf-8").trim()
      } else {
        return new NextResponse("Unsupported file type. Please upload PDF or DOCX.", { status: 400 })
      }
    }

    if (!essayText) {
      return new NextResponse("No essay text found. Upload a PDF/DOCX with text or paste your essay.", { status: 400 })
    }

    // Choose Google provider: env or per-request API key
    const apiKey = pastedApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
    const provider = apiKey ? createGoogleGenerativeAI({ apiKey }) : google

    const { object } = await generateObject({
      model: provider("models/gemini-1.5-flash"),
      schema: ResultSchema,
      system: SYSTEM_INSTRUCTIONS,
      prompt: [
        "Process:",
        "Step 1: The student uploads essay.",
        "Step 2: AI analyses based on DSE criteria (type-aware).",
        "Step 3: AI gives feedback.",
        "",
        "Important:",
        "- Do NOT summarize the essay.",
        "- Put ALL formatted feedback (sections and examples) into 'inlineFeedback' exactly per the specified Markdown format and headings.",
        "- Keep 'summary' empty.",
        "- Enforce rubric difference constraint (no sub-score differs by more than 2).",
        "- If grammatical mistakes > 20, prioritise Grammar corrections and ask the student to rewrite those sentences.",
        "- If grammatical mistakes < 5, focus on Language precision and Content depth.",
        "- Sample essay: write 'Available on request.' only.",
        "",
        "Essay:",
        essayText,
      ].join("\n"),
    })

    const payload = {
      ...object,
      summary: "",
      meta: {
        extractionWarning,
        model: "gemini-1.5-flash",
      },
    }

    return NextResponse.json(payload)
  } catch (err: any) {
    console.error("Grade error:", err)
    return new NextResponse(err?.message || "Failed to grade essay.", { status: 500 })
  }
}
