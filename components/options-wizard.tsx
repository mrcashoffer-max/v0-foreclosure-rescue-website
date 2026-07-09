"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { wizardQuestions, recommendOptions, fitReason } from "@/lib/wizard"
import { categoryMeta } from "@/lib/options"
import { submitWizardLead } from "@/app/actions/leads"
import { site } from "@/lib/site"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

type Phase = "intro" | "questions" | "capture" | "results"

export function OptionsWizard({ source = "options-wizard" }: { source?: string }) {
  const [phase, setPhase] = useState<Phase>("intro")
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    county: "",
    auctionDate: "",
  })
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const totalQuestions = wizardQuestions.length
  const recommendations = useMemo(() => recommendOptions(answers), [answers])

  const progress =
    phase === "intro"
      ? 5
      : phase === "questions"
        ? ((step + 1) / (totalQuestions + 1)) * 100
        : phase === "capture"
          ? ((totalQuestions + 0.5) / (totalQuestions + 1)) * 100
          : 100

  function chooseAnswer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    // brief delay so the selection is visible before advancing
    setTimeout(() => {
      if (step < totalQuestions - 1) {
        setStep((s) => s + 1)
      } else {
        setPhase("capture")
      }
    }, 220)
  }

  function goBack() {
    setError("")
    if (phase === "capture") {
      setPhase("questions")
      setStep(totalQuestions - 1)
    } else if (phase === "questions" && step > 0) {
      setStep((s) => s - 1)
    } else if (phase === "questions" && step === 0) {
      setPhase("intro")
    }
  }

  function submit() {
    setError("")
    if (!contact.name || !contact.phone || !contact.email) {
      setError("Please fill in your name, phone, and email so we can send your plan.")
      return
    }
    startTransition(async () => {
      const res = await submitWizardLead({
        ...contact,
        goal: answers.goal,
        source,
        quizData: answers,
        recommendations: recommendations.map((r) => r.slug),
      })
      if (res.ok) {
        setPhase("results")
        toast.success("Your personalized plan is ready.")
      } else {
        setError(res.message)
        toast.error(res.message)
      }
    })
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        {/* Progress bar */}
        <div className="border-b border-border bg-secondary/40 px-6 py-4">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              Foreclosure Options Finder
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="p-6 sm:p-8">
          {phase === "intro" && (
            <div className="flex flex-col items-center gap-6 py-6 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="size-7" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-3">
                <h2 className="text-balance text-2xl font-semibold text-card-foreground sm:text-3xl">
                  Find out which options fit your situation
                </h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Answer {totalQuestions} quick questions and we&apos;ll show you the paths that make the
                  most sense for you — whether that&apos;s keeping your home or moving on with your equity
                  intact. It takes less than two minutes.
                </p>
              </div>
              <Button size="lg" className="w-full sm:w-auto" onClick={() => setPhase("questions")}>
                Start now
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                Private and confidential. No commitment required.
              </p>
            </div>
          )}

          {phase === "questions" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  Question {step + 1} of {totalQuestions}
                </span>
                <h2 className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl">
                  {wizardQuestions[step].question}
                </h2>
                {wizardQuestions[step].helper && (
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {wizardQuestions[step].helper}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {wizardQuestions[step].options.map((opt) => {
                  const selected = answers[wizardQuestions[step].id] === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => chooseAnswer(wizardQuestions[step].id, opt.value)}
                      className={`group flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${
                        selected
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-background hover:border-primary/50 hover:bg-secondary/50"
                      }`}
                    >
                      <span className="flex flex-col gap-0.5">
                        <span className="font-medium text-card-foreground">{opt.label}</span>
                        {opt.hint && (
                          <span className="text-sm text-muted-foreground">{opt.hint}</span>
                        )}
                      </span>
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-transparent group-hover:border-primary/50"
                        }`}
                        aria-hidden="true"
                      >
                        <CheckCircle2 className="size-4" />
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={goBack}>
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back
                </Button>
                <span className="text-xs text-muted-foreground">Select an answer to continue</span>
              </div>
            </div>
          )}

          {phase === "capture" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CheckCircle2 className="size-6" aria-hidden="true" />
                </span>
                <h2 className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl">
                  Your options are ready
                </h2>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  Tell us where to send your personalized summary. A specialist will review your
                  answers and reach out with clear next steps — free and with no obligation.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="w-name">Full name</Label>
                    <Input
                      id="w-name"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="w-phone">Phone</Label>
                    <Input
                      id="w-phone"
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      placeholder="(469) 555-0100"
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="w-email">Email</Label>
                  <Input
                    id="w-email"
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="w-address">
                    Property address <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="w-address"
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    placeholder="123 Main St, Dallas, TX"
                    autoComplete="street-address"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="w-county">
                      County <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="w-county"
                      value={contact.county}
                      onChange={(e) => setContact({ ...contact, county: e.target.value })}
                      placeholder="Dallas County"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="w-auction">
                      Auction date <span className="text-muted-foreground">(if known)</span>
                    </Label>
                    <Input
                      id="w-auction"
                      value={contact.auctionDate}
                      onChange={(e) => setContact({ ...contact, auctionDate: e.target.value })}
                      placeholder="First Tuesday, or a date"
                    />
                  </div>
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex flex-col gap-3">
                <Button size="lg" className="w-full" onClick={submit} disabled={isPending}>
                  {isPending ? "Preparing your plan..." : "Show my personalized options"}
                </Button>
                <Button variant="ghost" size="sm" onClick={goBack} disabled={isPending}>
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back
                </Button>
              </div>
              <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
                100% confidential. We never sell your information.
              </p>
            </div>
          )}

          {phase === "results" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="size-6" aria-hidden="true" />
                </span>
                <h2 className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl">
                  {contact.name.split(" ")[0]
                    ? `${contact.name.split(" ")[0]}, here are your best options`
                    : "Here are your best options"}
                </h2>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  Based on your answers, these paths may fit your situation best. A specialist will
                  reach out to walk through them with you.
                </p>
              </div>

              {answers.stage === "sale" && (
                <div className="flex flex-col gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Clock className="size-4 text-primary" aria-hidden="true" />
                    A sale date is scheduled — time matters, but you have options
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Because a date is set, the faster-acting options are listed first. You can also
                    speak with a free HUD-approved housing counselor right now at{" "}
                    <a href="tel:+18889954673" className="font-medium text-primary hover:underline">
                      1-888-995-HOPE
                    </a>{" "}
                    (1-888-995-4673).
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {recommendations.map((opt, i) => (
                  <div
                    key={opt.slug}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                          {i + 1}
                        </span>
                        <span className="font-semibold text-card-foreground">{opt.title}</span>
                      </span>
                      <Badge variant="secondary">{categoryMeta[opt.category].label}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{opt.summary}</p>
                    <div className="flex flex-col gap-1 rounded-xl bg-secondary/50 p-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        Why this may fit your situation
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {fitReason(opt, answers)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Suggested next step
                      </span>
                      <p className="text-sm leading-relaxed text-card-foreground">{opt.nextStep}</p>
                    </div>
                    <Link
                      href={`/options#${opt.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      See full details, advantages &amp; trade-offs
                    </Link>
                  </div>
                ))}
              </div>
              <p className="text-pretty text-center text-xs leading-relaxed text-muted-foreground">
                These are educational suggestions based on your answers — not advice. The right
                choice is always yours to make.
              </p>

              <div className="flex flex-col gap-3 rounded-2xl bg-secondary/60 p-5 text-center">
                <p className="text-sm font-medium text-foreground">
                  Want a person to walk through these with you?
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Chris can help — no pressure, no obligation.
                </p>
                <Button
                  render={<a href={site.phoneHref} />}
                  nativeButton={false}
                  variant="outline"
                  size="lg"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call {site.phone}
                </Button>
                <Link
                  href="/guides"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Or keep reading our free guides
                </Link>
              </div>

              <p className="text-pretty text-center text-xs leading-relaxed text-muted-foreground">
                {site.name} is run by a Texas real estate investor. Buying your home is one option we
                offer, but never the only one — and often not the right one. We&apos;ll always tell
                you honestly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
