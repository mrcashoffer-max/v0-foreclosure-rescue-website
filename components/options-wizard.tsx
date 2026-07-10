"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  resolveQuestions,
  baseQuestions,
  recommendOptions,
  fitReason,
  isTimeSensitive,
  isMostlyUnsure,
} from "@/lib/wizard"
import { categoryMeta } from "@/lib/options"
import { submitWizardLead } from "@/app/actions/leads"
import { site } from "@/lib/site"
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  LifeBuoy,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

type Phase = "intro" | "questions" | "results"

const HOPE_TEL = "tel:+18889954673"

export function OptionsWizard({ source = "options-wizard" }: { source?: string }) {
  const [phase, setPhase] = useState<Phase>("intro")
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [awaitingDate, setAwaitingDate] = useState(false)

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    county: "",
  })
  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState({ balance: "", lender: "", payment: "" })
  const [submitted, setSubmitted] = useState(false)

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const questions = useMemo(() => resolveQuestions(answers), [answers])
  const totalQuestions = baseQuestions.length
  const recommendations = useMemo(() => recommendOptions(answers), [answers])

  const current = questions[step]
  const selectedValue = current ? answers[current.id] : undefined
  const needsDate =
    awaitingDate && !!current?.datePickerFor?.includes(selectedValue ?? "")

  const progress =
    phase === "intro" ? 5 : phase === "questions" ? ((step + 1) / totalQuestions) * 95 : 100

  function advance() {
    setAwaitingDate(false)
    setTimeout(() => {
      if (step < totalQuestions - 1) {
        setStep((s) => s + 1)
      } else {
        setPhase("results")
      }
    }, 180)
  }

  function chooseAnswer(id: string, value: string) {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value }
      // Reset a previously chosen date if the answer no longer needs one.
      if (id === "stage" && !current?.datePickerFor?.includes(value)) {
        delete next.saleDate
      }
      // Changing the risk resets the stage answer since Q2 options differ.
      if (id === "risk") {
        delete next.stage
        delete next.saleDate
      }
      return next
    })

    if (current?.datePickerFor?.includes(value)) {
      setAwaitingDate(true)
      return
    }
    advance()
  }

  function goBack() {
    setError("")
    if (awaitingDate) {
      setAwaitingDate(false)
      return
    }
    if (phase === "results") {
      setPhase("questions")
      setStep(totalQuestions - 1)
    } else if (phase === "questions" && step > 0) {
      setStep((s) => s - 1)
    } else if (phase === "questions" && step === 0) {
      setPhase("intro")
    }
  }

  function submitContact() {
    setError("")
    if (!contact.name || !contact.phone || !contact.email) {
      setError("Please add your name, phone, and email so we can reach out.")
      return
    }
    startTransition(async () => {
      const res = await submitWizardLead({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
        county: contact.county,
        auctionDate: answers.saleDate,
        goal: answers.goal,
        source,
        quizData: {
          ...answers,
          ...(showDetails
            ? {
                approxBalance: details.balance,
                lender: details.lender,
                monthlyPayment: details.payment,
              }
            : {}),
        },
        recommendations: recommendations.map((r) => r.slug),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success("Thanks — Chris will reach out. No pressure.")
      } else {
        setError(res.message)
        toast.error(res.message)
      }
    })
  }

  const dateLabel = answers.stage === "taxsale" ? "When is the tax sale?" : "When is the auction?"

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
                  See which options fit your situation
                </h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Answer {totalQuestions} quick questions and we&apos;ll show you a personalized
                  shortlist right away — no contact info required to see your results. It takes less
                  than two minutes.
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

          {phase === "questions" && current && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  Question {step + 1} of {totalQuestions}
                </span>
                <h2 className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl">
                  {current.question}
                </h2>
                {current.helper && (
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {current.helper}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {current.options.map((opt) => {
                  const selected = answers[current.id] === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => chooseAnswer(current.id, opt.value)}
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

              {needsDate && (
                <div className="flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
                  <Label
                    htmlFor="w-saledate"
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <CalendarClock className="size-4 text-primary" aria-hidden="true" />
                    {dateLabel} <span className="text-muted-foreground">(if you know it)</span>
                  </Label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="w-saledate"
                      type="date"
                      value={answers.saleDate ?? ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({ ...prev, saleDate: e.target.value }))
                      }
                      className="sm:flex-1"
                    />
                    <Button onClick={advance} className="shrink-0">
                      Continue
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={advance}
                    className="self-start text-xs font-medium text-primary hover:underline"
                  >
                    I don&apos;t know the date — continue
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={goBack}>
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back
                </Button>
                {!needsDate && (
                  <span className="text-xs text-muted-foreground">Select an answer to continue</span>
                )}
              </div>
            </div>
          )}

          {phase === "results" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="size-6" aria-hidden="true" />
                </span>
                <h2 className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl">
                  Options worth exploring for your situation
                </h2>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  Based on your answers, here&apos;s a shortlist of paths that may fit — ordered by
                  what makes sense for you, not by what benefits anyone else.
                </p>
              </div>

              {isTimeSensitive(answers) && (
                <div className="flex flex-col gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Clock className="size-4 text-primary" aria-hidden="true" />
                    A {answers.stage === "taxsale" ? "tax sale" : "sale date"} is scheduled — time
                    matters, but you have options
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Because a date is set, the faster-acting options are listed first. You can also
                    speak with a free HUD-approved housing counselor right now at{" "}
                    <a href={HOPE_TEL} className="font-medium text-primary hover:underline">
                      1-888-995-HOPE
                    </a>{" "}
                    (1-888-995-4673).
                  </p>
                </div>
              )}

              {isMostlyUnsure(answers) && (
                <div className="flex flex-col gap-2 rounded-2xl border border-border bg-secondary/50 p-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <LifeBuoy className="size-4 text-primary" aria-hidden="true" />
                    Not sure where you stand? That&apos;s okay.
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Here&apos;s a gentle overview to start with. A free HUD-approved counselor can
                    help you figure out exactly where you are — no cost, no pressure — at{" "}
                    <a href={HOPE_TEL} className="font-medium text-primary hover:underline">
                      1-888-995-HOPE
                    </a>
                    .
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
                    <Link
                      href={`/options#${opt.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Learn more about {opt.title}
                    </Link>
                  </div>
                ))}
              </div>

              <p className="text-pretty text-center text-xs leading-relaxed text-muted-foreground">
                These are educational suggestions based on your answers — not advice. The right
                choice is always yours to make.
              </p>

              {/* Secondary, optional CTA */}
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
                <Link href="/guides" className="text-sm font-medium text-primary hover:underline">
                  Or keep reading our free guides
                </Link>
              </div>

              {/* Optional contact + deeper-details step (never required) */}
              {submitted ? (
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
                  <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
                  <p className="font-medium text-foreground">
                    Thanks, {contact.name.split(" ")[0] || "there"} — we&apos;ll be in touch.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Chris will review your answers and reach out with clear next steps. No pressure,
                    no obligation.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-card-foreground">
                      Optional: save your results or get a callback
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      You already have your options above. Only share your details if you&apos;d like
                      Chris to reach out or send you a written summary.
                    </p>
                  </div>

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
                  <div className="grid gap-4 sm:grid-cols-2">
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
                  </div>

                  {/* Deeper-details opt-in */}
                  {showDetails ? (
                    <div className="flex flex-col gap-4 rounded-xl border border-border bg-secondary/30 p-4">
                      <p className="text-sm font-medium text-foreground">
                        A few more details help us give a more specific breakdown
                      </p>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="w-balance">Approx. balance</Label>
                          <Input
                            id="w-balance"
                            value={details.balance}
                            onChange={(e) => setDetails({ ...details, balance: e.target.value })}
                            placeholder="$250,000"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="w-lender">Lender</Label>
                          <Input
                            id="w-lender"
                            value={details.lender}
                            onChange={(e) => setDetails({ ...details, lender: e.target.value })}
                            placeholder="Servicer name"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="w-payment">Monthly payment</Label>
                          <Input
                            id="w-payment"
                            value={details.payment}
                            onChange={(e) => setDetails({ ...details, payment: e.target.value })}
                            placeholder="$1,900"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowDetails(true)}
                      className="flex items-center gap-2 self-start text-sm font-medium text-primary hover:underline"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                      Want a more specific breakdown? A few more details help
                    </button>
                  )}

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button onClick={submitContact} disabled={isPending}>
                    {isPending ? "Sending..." : "Send my details to Chris"}
                  </Button>
                  <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                    <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
                    100% confidential. We never sell your information.
                  </p>
                </div>
              )}

              <p className="text-pretty text-center text-xs leading-relaxed text-muted-foreground">
                {site.name} is run by a Texas real estate investor. Buying your home is one option we
                offer, but never the only one — and often not the right one. We&apos;ll always tell
                you honestly.
              </p>

              <div className="flex justify-center">
                <Button variant="ghost" size="sm" onClick={goBack}>
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back to questions
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
