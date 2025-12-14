"use client"

import { Button } from "@/components/ui/button"
import { Brain, Battery, AlertTriangle, Heart, RefreshCw } from "lucide-react"

interface ScanResults {
  stress_index: number
  energy_score: number
  burnout_meter: number
  explanation: string
}

interface ResultsDashboardProps {
  results: ScanResults
  onRestart: () => void
}

export default function ResultsDashboard({ results, onRestart }: ResultsDashboardProps) {
  const getBurnoutRisk = (meter: number): string => {
    if (meter < 40) return "Low"
    if (meter < 70) return "Moderate"
    return "High"
  }

  const burnoutRisk = getBurnoutRisk(results.burnout_meter)

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Your Emotional Health Scan</h1>
          <p className="text-gray-600">Completed just now</p>
        </div>

        {/* Results Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {/* Stress Index Card */}
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2.5">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Stress Index</h3>
            </div>
            <div className="mb-3">
              <div className="text-5xl font-bold text-gray-900">{results.stress_index}</div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                style={{ width: `${results.stress_index}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{results.explanation}</p>
          </div>

          {/* Mental Energy Card */}
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2.5">
                <Battery className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Mental Energy Score</h3>
            </div>
            <div className="mb-3">
              <div className="text-5xl font-bold text-gray-900">{results.energy_score}</div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
                style={{ width: `${results.energy_score}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">Energy level based on emotional pattern analysis.</p>
          </div>

          {/* Burnout Risk Card */}
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2.5">
                <Brain className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Burnout Risk</h3>
            </div>
            <div className="mb-3">
              <div className="text-5xl font-bold text-gray-900">{results.burnout_meter}</div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
            <div className="mb-3 flex gap-2">
              <div
                className={`h-2 flex-1 rounded-full ${burnoutRisk === "Low" ? "bg-green-500" : "bg-gray-200"}`}
              />
              <div
                className={`h-2 flex-1 rounded-full ${burnoutRisk === "Moderate" ? "bg-yellow-500" : "bg-gray-200"}`}
              />
              <div
                className={`h-2 flex-1 rounded-full ${burnoutRisk === "High" ? "bg-red-500" : "bg-gray-200"}`}
              />
            </div>
            <p className="text-sm text-gray-600">Burnout risk level: {burnoutRisk}. Watch for signs of prolonged exhaustion.</p>
          </div>

        </div>

        {/* Insight Section */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-50 to-teal-50 p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">What this means for you today</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-600" />
              <p className="text-gray-700">
                Your stress signals are elevated. Consider hydration, reduced screen time, and short rest breaks.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-600" />
              <p className="text-gray-700">
                Mental energy is good but monitor for afternoon dips. Schedule important tasks in the morning.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-600" />
              <p className="text-gray-700">Practice 5-minute breathing exercises to improve emotional regulation.</p>
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <div className="mb-8 flex justify-center">
          <Button
            onClick={onRestart}
            variant="outline"
            className="h-12 gap-2 rounded-full px-6 text-base font-semibold bg-transparent"
          >
            <RefreshCw className="h-4 w-4" />
            Take Another Scan
          </Button>
        </div>

        {/* Disclaimer & Trust Footer */}
        <div className="rounded-2xl border border-gray-200 bg-white/50 p-6 text-center">
          <p className="mb-3 text-sm font-medium text-gray-900">
            This is an early-signal wellness tool, not a medical diagnosis.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">
              Consent Information
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">
              Ethics & Safety
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-900">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
