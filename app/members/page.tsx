"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Background } from "@/components/background"
import { Reveal } from "@/components/reveal"

type Member = {
  name: string
  role: string
  img: string
  bio: string
}

// Order: Michael, Xenon, Sky, Niki, Prudence, Allen, Bill, Eddie, Anne
const members: Member[] = [
  {
    name: "Michael Wong",
    role: "Chief Executive Officer",
    img: "/members/michael-wong.png",
    bio: "Michael Wong, a luminary in educational innovation, is the Founder and CEO of StarGrader. Earning a 5** in HKDSE English (top 1% of over 50,000 candidates), he led the R&D of the proprietary Atomic-Level Weighted Metrics (ALWM) framework, targeting traditional education pain points. This innovation propelled StarGrader to secure a spot in the HKUST 100K funding scheme and target a HKD 2.5M Series A round with a projected 300% revenue surge. Honored as one of Hong Kong’s Top 10 Outstanding Teens in 2023 among 293,000 peers, Michael blends visionary leadership with a passion for global betterment, driving StarGrader’s mission to empower learners worldwide, fostering a brighter, more connected future - just like a star.",
  },
  {
    name: "Xenon Chiu",
    role: "Chief Technology Officer",
    img: "/members/xenon-chiu.png",
    bio: "Xenon is the CTO of StarGrader and is pursuing a dual degree in Mechanical Engineering and Finance at the University of Hong Kong. His diverse academic background combines technical expertise with financial acumen, enabling him to lead the development of innovative, data-driven AI solutions for the platform. Since March 2025, Xenon has been working at Springer Capital which has strengthened his analytical skills, attention to detail, and understanding of financial markets. Additionally, he serves as the Director of External Affairs and Acting Marketing Director for the HKU Investment Society, where he secures sponsorships, organizes industry events, and fosters partnerships. Xenon’s interdisciplinary experience underpins his ability to drive technological innovation and strategic growth at StarGrader, ensuring the platform remains at the forefront of educational technology.",
  },
  {
    name: "Sky Lee",
    role: "Artificial Intelligence and Machine Learning Developer",
    img: "/members/sky-lee.png",
    bio: "Sky, an AI and ML Developer at StarGrader, is pursuing a BA (Hons) in Natural Sciences at The University of Cambridge, specializing in Physics. As one of around 100 students from Hong Kong awarded the Hong Kong Scholarship for Excellence Scheme for academic and overall excellence, he is motivated to share his success strategies. His rigorous academic foundation in physics enhances his analytical and problem-solving skills, which he applies to develop advanced AI algorithms on StarGrader, making exam preparation more accessible. His goal is to empower students worldwide to achieve top grades through innovative AI tools. He gained practical experience at UOB Kay Hian and Chiron Group, applying quantitative skills to financial and scientific projects, further strengthening his ability to support StarGrader’s mission.",
  },
  {
    name: "Niki Hung",
    role: "Human Resource Manager",
    img: "/members/niki-hung.png",
    bio: "Niki is responsible for human resource management at StarGrader and is currently pursuing a Bachelor of Medicine, Bachelor of Surgery degree at the University of Hong Kong. Throughout her academic journey, Niki has consistently excelled in her studies achieving 5A*s, earning recognition as an academic star through high school. Her dedication to lifelong learning inspired her to join StarGrader, where she aims to share effective learning techniques and strategies with students. Prior to joining the team, Niki founded and managed her own tuition business, helping students achieve their academic goals through tailored guidance. Her proven academic excellence makes her a vital asset to StarGrader’s mission of accessible, quality exam preparation.",
  },
  {
    name: "Prudence Cheung",
    role: "Linguist",
    img: "/members/prudence-cheung.png",
    bio: "Prudence is a dedicated linguist of the StarGrader team, currently pursuing a Bachelor of Arts (Honours) in English Studies and Digital Communication, alongside a Bachelor of Education (Honours) in English Language at The Education University of Hong Kong. Her academic career is marked by outstanding achievements, including gold medals in the World Scholar's Cup Beijing Global Round, Writing Champions, Champion Scholars—demonstrating her strong communication, critical thinking, and leadership skills. Her extensive experience in academic competitions and tutoring reflects her passion for education and her commitment to education equality.",
  },
  {
    name: "Allen Kwok",
    role: "Chief Operating Officer",
    img: "/members/allen-kwok.png",
    bio: "Allen is the COO at StarGrader and is pursuing a Bachelor of Business Administration at HKUST. In 2023, he served as an Administrator at Lumos Education, where his meticulous attention to detail and organizational skills ensured smooth daily operations, supporting the organization’s mission to deliver quality education. In 2022, Allen gained experience as an Insurance Agent at China Life Insurance, where his analytical thinking, client relationship management, and strategic planning abilities developed. At StarGrader, Allen applies these skills to streamline operations, drive strategic initiatives, and foster innovative solutions that enhance the platform’s effectiveness in delivering accessible, data-driven English exam preparation for students worldwide.",
  },
  {
    name: "Bill Wong",
    role: "Head of Technology",
    img: "/members/bill-wong.png",
    bio: "Bill, a prodigious talent in computational innovation, serves as the Head of Tech at StarGrader. A distinguished competitor in the 2023 International Mathematical Modeling Challenge (IMMC), Bill tackled complex land-use optimization problems, integrating geography, climate, and socio-economic factors to devise a quantitative decision metric for sustainable development, blending mathematical rigor with real-world applicability, competing against top global students. Bill is currently pursuing a double major degree in Computer Science and Mathematics at The Hong Kong University of Science and Technology.",
  },
  {
    name: "Eddie Wong",
    role: "AI/ML Specialist",
    img: "/members/eddie-wong.png",
    bio: "Eddie is the AI/ML Specialist at StarGrader, currently pursuing a degree in Physics at University College London. He leads innovative projects in machine learning and algorithms, drawing on his extensive experience in open-source initiatives focused on natural sciences. As a member of the UCL Innovation Lab and the Society of Chemistry Industry College of Scholars, Eddie actively contributes to bridging scientific innovation with business applications, evidenced by his recognition as a finalist in the Bright SCIdea competition. His work at StarGrader reflects his dedication to enhancing educational tools and resources through advanced technology.",
  },
  {
    name: "Anne Ng",
    role: "Linguist",
    img: "/members/anne-ng.png",
    bio: "Anne is a Linguist at StarGrader pursuing a BA in Linguistics at The University of Hong Kong in addition to a BA in Finance. Her experience includes developing original content for Pearson's English courseware and curating authentic teaching materials for Secondary English textbooks during her work as an English Editorial Intern. Additionally, she has worked as an English teacher at SpeakUp in Almaty, Kazakhstan, where she conducted classes for teenagers and adults at B1-B2 levels, led IELTS preparation courses, revised curricula, and created engaging teaching materials. Her initiatives align with her commitment to improving English education and community development, much like her work at StarGrader, which aims to support students preparing for the HKDSE English exam through accessible, quality resources.",
  },
]

function snippet(text: string, len = 220) {
  if (!text) return ""
  const clean = text.replace(/\s+/g, " ").trim()
  return clean.length > len ? clean.slice(0, len).trimEnd() + "…" : clean
}

export default function MembersPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <Background />
      <Navbar />
      <main className="flex-1 px-4 md:px-8">
        <div className="mx-auto max-w-6xl pt-20 md:pt-28 pb-10 md:pb-16">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{"The team"}</h1>
          </Reveal>
          <p className="mt-4 text-neutral-300 max-w-3xl">{"Educators and builders laser‑focused on 5**."}</p>

          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m, idx) => (
              <Reveal key={m.name} delay={idx * 60}>
                <article className="group relative rounded-3xl border border-white/10 bg-neutral-900/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-[#BBDEFB]/40 focus-within:-translate-y-1">
                  <div className="relative">
                    <Image
                      alt={m.name}
                      src={m.img || "/placeholder.svg?height=480&width=640&query=member%20portrait"}
                      width={640}
                      height={480}
                      className="h-64 w-full object-cover rounded-2xl"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                      <p className="text-sm leading-relaxed text-neutral-100 line-clamp-5">{snippet(m.bio)}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-semibold">{m.name}</h2>
                    <p className="text-sm text-neutral-300">{m.role}</p>
                  </div>

                  <div className="mt-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="rounded-full bg-[#BBDEFB] text-black hover:bg-[#A7D3FA]">
                          {"Read full bio"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl border-white/10 bg-neutral-950 text-neutral-200">
                        <DialogHeader>
                          <DialogTitle className="text-white">{m.name}</DialogTitle>
                          <p className="text-sm text-neutral-400">{m.role}</p>
                        </DialogHeader>
                        <div className="mt-2 max-h-[60vh] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                          {m.bio}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
