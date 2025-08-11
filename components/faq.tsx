"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is my writing private?",
    a: "Yes. Essays are processed for grading only. If you enter an API key, it is sent only for that request and saved locally in your browser for convenience.",
  },
  {
    q: "Does it OCR scanned PDFs?",
    a: "If a PDF has no selectable text, local OCR isn’t run here. Paste your text for best results—native OCR is on our roadmap.",
  },
  {
    q: "Which model do you use?",
    a: "Google Gemini 1.5 Flash by default. You can provide your own Gemini API key or set the env variable in deployment.",
  },
]

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger className="text-white hover:text-blue-300">{f.q}</AccordionTrigger>
          <AccordionContent className="text-neutral-300">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
