import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Background } from "@/components/background"
import { Reveal } from "@/components/reveal"
import { FAQ } from "@/components/faq"

const WHATSAPP_MESSAGE = "Hi! I would like to know more about StarGrader."
const WHATSAPP_URL = `https://wa.me/85268718291?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export default function PricingPage() {
  const tiers = [
    {
      name: "Student Plan",
      price: "$19 / month",
      features: ["Unlimited essay grading", "Personalized feedback", "Progress tracking", "Study recommendations"],
      cta: "Start Free Trial",
    },
    {
      name: "School Plan",
      price: "Custom Pricing",
      desc: "Featured",
      features: [
        "Unlimited teacher accounts",
        "Bulk essay processing",
        "Analytics dashboard",
        "Custom integration",
        "Priority support",
      ],
      highlight: true,
      cta: "Contact Sales",
    },
    {
      name: "Tutor Plan",
      price: "$49 / month",
      features: ["Multi-student management", "Advanced analytics", "Custom rubrics", "Progress reports"],
      cta: "Get Started",
    },
  ] as const

  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <Background />
      <Navbar />
      <main className="flex-1 px-4 md:px-8">
        <div className="mx-auto max-w-6xl pt-20 md:pt-28 pb-10 md:pb-16">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{"Choose your path to excellence."}</h1>
          </Reveal>
          <p className="mt-4 text-neutral-300 max-w-2xl">{"For schools and individuals. Precision that scales."}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <Card
                  className={`rounded-3xl ${
                    "highlight" in t && (t as any).highlight
                      ? "border-[#BBDEFB]/60 shadow-[0_0_0_3px_rgba(187,222,251,.25)]"
                      : "border-white/10"
                  } border bg-neutral-900/70 backdrop-blur transition-all hover:-translate-y-1`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-white">{t.name}</CardTitle>
                      {"highlight" in t && (t as any).highlight ? (
                        <span className="rounded-full bg-[#BBDEFB] px-2 py-1 text-[10px] font-medium text-black">
                          {"Featured"}
                        </span>
                      ) : null}
                    </div>
                    <div className="text-3xl md:text-4xl font-semibold text-white">{t.price}</div>
                    {"desc" in t && (t as any).desc ? (
                      <div className="text-sm text-neutral-300">{(t as any).desc}</div>
                    ) : null}
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-neutral-200">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="inline-block h-4 w-4 rounded-full bg-[#BBDEFB]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-8 w-full bg-[#BBDEFB] hover:bg-[#A7D3FA] text-black rounded-full">
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        {t.cta}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-20">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{"FAQs"}</h2>
            </Reveal>
            <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900/70 p-6">
              <FAQ />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
