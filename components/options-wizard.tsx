"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  finderQuestions,
  totalFinderQuestions,
  toFinderAnswers,
  analyze,
  fitReason,
  texasGuidance,
  situationSummary,
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
  ClipboardList,
  Clock,
  Gauge,
  ListChecks,
  LifeBuoy,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  TriangleAlert,
} from "lucide-react"
import { toast } from "sonner"

type Phase = "intro" | "questions" | "results"

const HOPE_TEL = "tel:+18889954673"

export function OptionsWizard({ source = "options-wizard" }: { source?: string }) {
  const [phase, setPhase] = useState<Phase>("intro")
  const [step, setStep] = useState(0)
  const [single, setSingle] = useState<Record<string, string>>({})
  const [challenges, setChallenges] = useState<string[]>([])
  const [awaitingDate, setAwaitingDate] = useState(false)

  const [contact, setContact] = useState({ name: "", phone: "", email: "", address: "", county: "" })
  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState({ balance: "", lender: "", payment: "" })
  const [submitted, setSubmitted] = useState(false)

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const total = totalFinderQuestions
  const finderAnswers = useMemo(() => toFinderAnswers(single, challenges), [single, challenges])
  const analysis = useMemo(() => analyze(finderAnswers), [finderAnswers])

  const best = analysis.ranked[0]
  const second = analysis.ranked[1]
  const rest = analysis.ranked.slice(2)

  const current = finderQuestions[step]
  const isMulti = !!current?.multi
  const selectedValue = current ? single[current.id] : undefined
  const needsDate = awaitingDate && !!current?.datePickerFor?.includes(selectedValue ?? "")
  const canContinueMulti = challenges.length > 0

  const progress = phase === "intro" ? 5 : phase === "questions" ? ((step + 1) / total) * 95 : 100

  function advance() {
    setAwaitingDate(false)
    setTimeout(() => {
      if (step < total - 1) setStep((s) => s + 1)
      else setPhase("results")
    }, 160)
  }

  function chooseSingle(id: string, value: string) {
    setSingle((prev) => {
      const next = { ...prev, [id]: value }
      if (id === "stage" && !current?.datePickerFor?.includes(value)) delete next.saleDate
      return next
    })
    if (current?.datePickerFor?.includes(value)) {
      setAwaitingDate(true)
      return
    }
    advance()
  }

  function toggleChallenge(value: string) {
    setChallenges((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  function goBack() {
    setError("")
    if (awaitingDate) {
      setAwaitingDate(false)
      return
    }
    if (phase === "results") {
      setPhase("questions")
      setStep(total - 1)
    } else if (phase === "questions" && step > 0) {
      setStep((s) => s - 1)
    } else if (phase === "questions" && step === 0) {
      setPhase("intro")
    }
  }

  function unlockPlan() {
    setError("")
    if (!contact.name || !contact.phone || !contact.email) {
      setError("Please add your name, phone, and email so we can send your full plan.")
      return
    }
    startTransition(async () => {
      const res = await submitWizardLead({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
        county: contact.county,
        auctionDate: single.saleDate,
        goal: single.goal,
        source,
        quizData: {
          ...single,
          challenges: challenges.join(", "),
          ...(showDetails
            ? { approxBalance: details.balance, lender: details.lender, monthlyPayment: details.payment }
            : {}),
        },
        recommendations: analysis.ranked.map((r) => r.slug),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success("Your personalized action plan is ready below.")
      } else {
        setError(res.message)
        toast.error(res.message)
      }
    })
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="border-b border-border bg-secondary/40 px-6 py-4">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              Homeowner Decision Assistant
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="p-6 sm:p-8">
          {/* ---------------- INTRO ---------------- */}
          {phase === "intro" && (
            <div className="flex flex-col items-center gap-6 py-6 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="size-7" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-3">
                <h2 className="text-balance text-2xl font-semibold text-card-foreground sm:text-3xl">
                  Let&apos;s find the right path for your situation
                </h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Answer {total} short questions and we&apos;ll analyze your situation like an
                  experienced Texas foreclosure advisor would — then show you a personalized
                  recommendation. It takes about two to three minutes.
                </p>
              </div>
              <Button size="lg" className="w-full sm:w-auto" onClick={() => setPhase("questions")}>
                Begin
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                Private and confidential. No contact info needed to see your recommendation.
              </p>
            </div>
          )}

          {/* ---------------- QUESTIONS ---------------- */}
          {phase === "questions" && current && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  Question {step + 1} of {total}
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
                  const selected = isMulti
                    ? challenges.includes(opt.value)
                    : single[current.id] === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        isMulti ? toggleChallenge(opt.value) : chooseSingle(current.id, opt.value)
                      }
                      aria-pressed={selected}
                      className={`group flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${
                        selected
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-background hover:border-primary/50 hover:bg-secondary/50"
                      }`}
                    >
                      <span className="flex flex-col gap-0.5">
                        <span className="font-medium text-card-foreground">{opt.label}</span>
                        {opt.hint && <span className="text-sm text-muted-foreground">{opt.hint}</span>}
                      </span>
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center border transition-colors ${
                          isMulti ? "rounded-md" : "rounded-full"
                        } ${
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

              {isMulti && (
                <Button onClick={advance} disabled={!canContinueMulti}>
                  Continue
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              )}

              {needsDate && (
                <div className="flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
                  <Label
                    htmlFor="w-saledate"
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <CalendarClock className="size-4 text-primary" aria-hidden="true" />
                    When is the sale? <span className="text-muted-foreground">(if you know it)</span>
                  </Label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="w-saledate"
                      type="date"
                      value={single.saleDate ?? ""}
                      onChange={(e) => setSingle((prev) => ({ ...prev, saleDate: e.target.value }))}
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
                {!needsDate && !isMulti && (
                  <span className="text-xs text-muted-foreground">Select an answer to continue</span>
                )}
                {isMulti && (
                  <span className="text-xs text-muted-foreground">Choose any that apply</span>
                )}
              </div>
            </div>
          )}

          {/* ---------------- RESULTS ---------------- */}
          {phase === "results" && best && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="size-6" aria-hidden="true" />
                </span>
                <h2 className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl">
                  We&apos;ve analyzed your situation
                </h2>
              </div>

              {/* Situation summary — reflect their story back before advising */}
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-secondary/40 p-5">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ClipboardList className="size-4 text-primary" aria-hidden="true" />
                  Based on what you shared
                </span>
                <div className="flex flex-col gap-2">
                  {situationSummary(finderAnswers).map((line, i) => (
                    <p key={i} className="text-pretty text-sm leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {isTimeSensitive(finderAnswers) && (
                <div className="flex flex-col gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Clock className="size-4 text-primary" aria-hidden="true" />
                    Time matters here — but you still have options
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Because things are moving quickly, we&apos;ve prioritized faster-acting paths. You
                    can also speak with a free HUD-approved housing counselor right now at{" "}
                    <a href={HOPE_TEL} className="font-medium text-primary hover:underline">
                      1-888-995-HOPE
                    </a>{" "}
                    (1-888-995-4673).
                  </p>
                </div>
              )}

              {isMostlyUnsure(finderAnswers) && (
                <div className="flex flex-col gap-2 rounded-2xl border border-border bg-secondary/50 p-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <LifeBuoy className="size-4 text-primary" aria-hidden="true" />
                    Not sure where you stand? That&apos;s okay.
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We&apos;ve started you with a gentle overview. A free HUD-approved counselor can
                    help pinpoint exactly where you are — no cost, no pressure.
                  </p>
                </div>
              )}

              {/* Best initial recommendation */}
              <div className="flex flex-col gap-4 rounded-2xl border border-primary/40 bg-background p-5 shadow-sm">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Best recommendation
                    </span>
                    <Badge variant="secondary">{categoryMeta[best.category].label}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">{best.title}</h3>
                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <Gauge className="size-3.5 text-primary" aria-hidden="true" />
                      {analysis.confidence} match for your situation
                    </span>
                    <Progress value={analysis.confidenceScore} className="h-1.5" />
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{best.summary}</p>

                <div className="flex flex-col gap-1 rounded-xl bg-secondary/50 p-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Why this fits you
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {fitReason(best, finderAnswers)}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1 rounded-xl border border-border p-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <ThumbsUp className="size-3.5 text-primary" aria-hidden="true" />
                      Key advantage
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{best.advantages[0]}</p>
                  </div>
                  <div className="flex flex-col gap-1 rounded-xl border border-border p-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <TriangleAlert className="size-3.5 text-primary" aria-hidden="true" />
                      Keep in mind
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {best.considerations[0]}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 rounded-xl border border-dashed border-primary/40 p-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Suggested next step
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{best.nextStep}</p>
                </div>

                <Link
                  href={`/options#${best.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Learn more about {best.title}
                </Link>
              </div>

              {/* Another option worth considering */}
              {second && (
                <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Another option worth considering
                    </span>
                    <Badge variant="secondary">{categoryMeta[second.category].label}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">{second.title}</h3>
                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <Gauge className="size-3.5 text-primary" aria-hidden="true" />
                      {analysis.secondaryConfidence} match for your situation
                    </span>
                    <Progress value={analysis.secondaryScore} className="h-1.5" />
                  </div>

                  <div className="flex flex-col gap-1 rounded-xl bg-secondary/50 p-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Why it may fit
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {fitReason(second, finderAnswers)}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1 rounded-xl border border-border p-3">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <ThumbsUp className="size-3.5 text-primary" aria-hidden="true" />
                        Key advantage
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {second.advantages[0]}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-xl border border-border p-3">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <TriangleAlert className="size-3.5 text-primary" aria-hidden="true" />
                        Keep in mind
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {second.considerations[0]}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/options#${second.slug}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Learn more about {second.title}
                  </Link>
                </div>
              )}

              {/* Continue the analysis — additional personalized guidance */}
              {!submitted ? (
                <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex flex-col gap-2">
                    <h3 className="flex items-center gap-2 font-semibold text-card-foreground">
                      <ListChecks className="size-4 text-primary" aria-hidden="true" />
                      Your personalized analysis doesn&apos;t stop here
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Based on your answers, we identified{" "}
                      {rest.length > 0
                        ? `${rest.length} more option${rest.length > 1 ? "s" : ""}`
                        : "additional guidance"}{" "}
                      that may also fit your situation, along with Texas-specific details that could
                      affect which path is best. If you&apos;d like, we&apos;ll prepare your complete
                      personalized action plan, including:
                    </p>
                    <ul className="flex flex-col gap-1.5 pt-1">
                      {[
                        "Your remaining recommended options",
                        "Texas-specific guidance, deadlines, and considerations",
                        "Suggested next steps for your situation",
                        `A personal review by ${site.specialist}, a Texas foreclosure specialist, to catch opportunities the automated analysis may have missed`,
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="pt-1 text-sm leading-relaxed text-muted-foreground">
                      Add your details below and we&apos;ll prepare your complete personalized action
                      plan.
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

                  <Button onClick={unlockPlan} disabled={isPending} size="lg">
                    {isPending ? "Preparing your plan..." : "Prepare my personalized action plan"}
                  </Button>
                  <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                    <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
                    100% confidential. We never sell your information.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-center">
                    <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
                    <p className="font-medium text-foreground">
                      Here&apos;s your complete action plan, {contact.name.split(" ")[0] || "friend"}.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {site.specialist} will also personally review your answers and reach out with
                      clear next steps — no pressure, no obligation.
                    </p>
                  </div>

                  {rest.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="font-semibold text-card-foreground">
                        Your other recommended options
                      </h3>
                      {rest.map((opt, i) => (
                        <div
                          key={opt.slug}
                          className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="flex items-center gap-2">
                              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                {i + 3}
                              </span>
                              <span className="font-semibold text-card-foreground">{opt.title}</span>
                            </span>
                            <Badge variant="secondary">{categoryMeta[opt.category].label}</Badge>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">{opt.summary}</p>
                          <div className="flex flex-col gap-1 rounded-xl bg-secondary/50 p-3">
                            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                              Why this may fit
                            </span>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {fitReason(opt, finderAnswers)}
                            </p>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            <span className="font-medium text-foreground">Next step: </span>
                            {opt.nextStep}
                          </p>
                          <Link
                            href={`/options#${opt.slug}`}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Learn more about {opt.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 rounded-2xl border border-border bg-secondary/40 p-5">
                    <h3 className="flex items-center gap-2 font-semibold text-card-foreground">
                      <MapPin className="size-4 text-primary" aria-hidden="true" />
                      Texas-specific guidance &amp; deadlines
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {texasGuidance(finderAnswers).map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 rounded-2xl bg-secondary/60 p-5 text-center">
                    <p className="text-sm font-medium text-foreground">
                      Want {site.specialist} to walk through this with you?
                    </p>
                    <Button render={<a href={site.phoneHref} />} nativeButton={false} variant="outline" size="lg">
                      <Phone className="size-4" aria-hidden="true" />
                      Call {site.phone}
                    </Button>
                    <Link href="/guides" className="text-sm font-medium text-primary hover:underline">
                      Or keep reading our free guides
                    </Link>
                  </div>
                </div>
              )}

              <p className="text-pretty text-center text-xs leading-relaxed text-muted-foreground">
                {site.name} is run by a Texas real estate investor. Buying your home is one option we
                offer, but never the only one — and often not the right one. We&apos;ll always tell you
                honestly.
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
