"use server"

import { getPool } from "@/lib/db"

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
      `INSERT INTO leads (name, phone, email, address, situation, source)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, phone, email, address, situation || null, source || null],
    )
    return {
      ok: true,
      message: "Thank you. A foreclosure specialist will reach out to you shortly.",
    }
  } catch (error) {
    console.log("[v0] submitLead error:", error instanceof Error ? error.message : error)
    return {
      ok: false,
      message: "Something went wrong saving your request. Please call us directly at 469-509-3031.",
    }
  }
}
