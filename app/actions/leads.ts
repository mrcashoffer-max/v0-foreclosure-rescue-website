"use server"

import { getPool } from "@/lib/db"
import { site } from "@/lib/site"

export type LeadState = {
  ok: boolean
  message: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitLead(
  _prevState: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const name = String(formData.get("name") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const address = String(formData.get("address") ?? "").trim()
  const county = String(formData.get("county") ?? "").trim()
  const auctionDate = String(formData.get("auctionDate") ?? "").trim()
  const goal = String(formData.get("goal") ?? "").trim()
  const situation = String(formData.get("situation") ?? "").trim()
  const source = String(formData.get("source") ?? "website").trim()

  if (!name || !phone || !email || !address) {
    return { ok: false, message: "Please fill in your name, phone, email, and property address." }
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  try {
    const pool = getPool()
    await pool.query(
      `INSERT INTO leads (name, phone, email, address, county, auction_date, goal, situation, source, lead_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'consultation')`,
      [
        name,
        phone,
        email,
        address,
        county || null,
        auctionDate || null,
        goal || null,
        situation || null,
        source || null,
      ],
    )
    return {
      ok: true,
      message: "Thank you. A foreclosure specialist will reach out to you shortly.",
    }
  } catch (error) {
    console.log("[v0] submitLead error:", error instanceof Error ? error.message : error)
    return {
      ok: false,
      message: `Something went wrong saving your request. Please call us directly at ${site.phone}.`,
    }
  }
}

export type WizardResult = {
  ok: boolean
  message: string
}

/**
 * Saves a lead captured through the interactive Foreclosure Options wizard.
 * quizData is the JSON of the visitor's answers; recommendations are the
 * matched option keys shown to them.
 */
export async function submitWizardLead(input: {
  name: string
  phone: string
  email: string
  address?: string
  county?: string
  auctionDate?: string
  goal?: string
  source?: string
  quizData: Record<string, string>
  recommendations: string[]
}): Promise<WizardResult> {
  const name = input.name.trim()
  const phone = input.phone.trim()
  const email = input.email.trim()
  const address = (input.address ?? "").trim()
  const county = (input.county ?? "").trim()
  const auctionDate = (input.auctionDate ?? "").trim()
  const goal = (input.goal ?? "").trim()
  const source = (input.source ?? "options-wizard").trim() || "options-wizard"

  if (!name || !phone || !email) {
    return { ok: false, message: "Please fill in your name, phone, and email." }
  }
  if (!isValidEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  try {
    const pool = getPool()
    await pool.query(
      `INSERT INTO leads (name, phone, email, address, county, auction_date, goal, source, lead_type, quiz_data, recommendations)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'wizard', $9, $10)`,
      [
        name,
        phone,
        email,
        address || null,
        county || null,
        auctionDate || null,
        goal || null,
        source,
        JSON.stringify(input.quizData),
        input.recommendations,
      ],
    )
    return {
      ok: true,
      message: "Your personalized plan is ready. A specialist will follow up shortly.",
    }
  } catch (error) {
    console.log("[v0] submitWizardLead error:", error instanceof Error ? error.message : error)
    return {
      ok: false,
      message: `Something went wrong. Please call us directly at ${site.phone}.`,
    }
  }
}
