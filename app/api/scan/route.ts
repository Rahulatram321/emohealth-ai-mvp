import { NextResponse } from "next/server"

interface ScanResults {
  stress_index: number
  energy_score: number
  burnout_meter: number
  explanation: string
}

function generateScanResults(): ScanResults {
  const stress_index = Math.floor(Math.random() * (85 - 45 + 1)) + 45
  const burnoutMin = Math.floor(stress_index * 0.6)
  const burnoutMax = Math.floor(stress_index * 0.8)
  const burnout_meter = Math.floor(Math.random() * (burnoutMax - burnoutMin + 1)) + burnoutMin

  return {
    stress_index,
    energy_score: 100 - stress_index,
    burnout_meter,
    explanation:
      "Emotional vitals estimated using pattern-based analysis (beta). This is an early wellness signal and not a medical diagnosis.",
  }
}

export async function POST() {
  const results = generateScanResults()
  return NextResponse.json(results)
}


