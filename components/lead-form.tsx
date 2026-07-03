"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { submitLead, type LeadState } from "@/app/actions/leads"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { CheckCircle2, ShieldCheck } from "lucide-react"

const initialState: LeadState = { ok: false, message: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" className="w-full text-base" disabled={pending}>
      {pending ? "Sending..." : "Request my free consultation"}
    </Button>
  )
}

export function LeadForm({ source = "website" }: { source?: string }) {
  const [state, formAction] = useActionState(submitLead, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message) {
      if (state.ok) {
        toast.success(state.message)
        formRef.current?.reset()
      } else {
        toast.error(state.message)
      }
    }
  }, [state])

  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="size-12 text-primary" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-card-foreground">{"You're all set"}</h3>
        <p className="text-pretty text-muted-foreground leading-relaxed">{state.message}</p>
        <p className="text-sm text-muted-foreground">
          Prefer to talk now? Call{" "}
          <a href="tel:+14695093031" className="font-medium text-primary hover:underline">
            469-509-3031
          </a>
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="source" value={source} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Jane Doe" required autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(469) 555-0100"
            required
            autoComplete="tel"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          required
          autoComplete="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Property address</Label>
        <Input
          id="address"
          name="address"
          placeholder="123 Main St, Dallas, TX 75201"
          required
          autoComplete="street-address"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="county">
            County <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input id="county" name="county" placeholder="Dallas County" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="auctionDate">
            Auction date <span className="text-muted-foreground">(if known)</span>
          </Label>
          <Input id="auctionDate" name="auctionDate" placeholder="First Tuesday, or a date" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="goal">
          What matters most to you? <span className="text-muted-foreground">(optional)</span>
        </Label>
        <select
          id="goal"
          name="goal"
          defaultValue=""
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="" disabled>
            Select a goal
          </option>
          <option value="keep">I want to keep my home</option>
          <option value="unsure">I&apos;m not sure yet — show me my options</option>
          <option value="move">I&apos;m ready to move on with my equity</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="situation">
          Tell us about your situation <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="situation"
          name="situation"
          rows={3}
          placeholder="How far behind are you? Have you received any notices from your lender?"
        />
      </div>
      <SubmitButton />
      <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
        100% confidential. No obligation. We never sell your information.
      </p>
    </form>
  )
}
