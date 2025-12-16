\"use client\"

import { useState } from \"react\"
import { Button } from \"@/components/ui/button\"
import { Brain, Battery, AlertTriangle, ChevronDown, ChevronUp, Info, Lock, RefreshCw } from \"lucide-react\"
import { useToast } from \"@/hooks/use-toast\"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from \"@/components/ui/tooltip\"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from \"@/components/ui/drawer\"

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
  const [openCard, setOpenCard] = useState<"stress" | "energy" | "burnout" | null>("stress")
  const [hasSavedToday, setHasSavedToday] = useState(false)
  const { toast } = useToast()

  const getBurnoutRisk = (meter: number): string => {
    if (meter < 40) return "Low"
    if (meter < 70) return "Moderate"
    return "High"
  }

  const burnoutRisk = getBurnoutRisk(results.burnout_meter)

  const handleSaveToday = () => {
    try {
      const key = "emohealth_saved_scans"
      const existingRaw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null
      const existing = existingRaw ? JSON.parse(existingRaw) : []
      const entry = {
        date: new Date().toISOString(),
        stress_index: results.stress_index,
        energy_score: results.energy_score,
        burnout_meter: results.burnout_meter,
      }
      const updated = [entry, ...existing].slice(0, 30)
      window.localStorage.setItem(key, JSON.stringify(updated))
    } catch {
      // fail silently for now
    }

    setHasSavedToday(true)
    toast({
      title: "Today’s emotional vitals saved",
      description: "This device now has a copy of your latest scan for your own reference.",
    })

    window.setTimeout(() => {
      setHasSavedToday(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
            Today&apos;s emotional vitals
          </p>
          <h1 className="mb-3 text-2xl font-semibold text-slate-900 md:text-3xl">
            Your Emotional Health Scan
          </h1>
          <p className="text-sm text-slate-600 md:text-base">
            These are early emotional wellness signals based on your most recent scan. They are not a diagnosis or
            clinical assessment.
          </p>
        </div>

        {/* Results Grid */}
        <div className="mb-8 grid gap-5 md:grid-cols-3">
          {/* Stress Index Card */}
          <div className="group rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 transition-colors hover:bg-slate-50">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-slate-100 p-2.5">
                  <AlertTriangle className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-semibold text-slate-900">Stress Index</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Approximate level of mental and emotional load during this scan window.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {results.stress_index <= 50 ? "Lower range" : results.stress_index <= 70 ? "Mid range" : "Higher range"}
              </span>
            </div>
            <div className="mb-4 flex items-baseline gap-2">
              <div className="text-3xl font-semibold text-slate-900 md:text-4xl">{results.stress_index}</div>
              <div className="text-xs text-slate-500">out of 100</div>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all"
                style={{ width: `${results.stress_index}%` }}
              />
            </div>
            <button
              type="button"
              onClick={() => setOpenCard(openCard === "stress" ? null : "stress")}
              className="mt-2 flex w-full items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:bg-slate-100"
            >
              <span>What this means</span>
              {openCard === "stress" ? (
                <ChevronUp className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              )}
            </button>
            {openCard === "stress" && (
              <p className="mt-2 text-xs text-slate-600">
                A higher stress index can reflect tension, cognitive load, or ongoing concerns. Consider short pauses,
                hydration, and brief movement where possible.
              </p>
            )}
          </div>

          {/* Mental Energy Card */}
          <div className="group rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 transition-colors hover:bg-slate-50">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-slate-100 p-2.5">
                  <Battery className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-semibold text-slate-900">Energy Score</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Approximate mental energy available for focus and decision-making.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {results.energy_score >= 70 ? "Higher range" : results.energy_score >= 45 ? "Mid range" : "Lower range"}
              </span>
            </div>
            <div className="mb-4 flex items-baseline gap-2">
              <div className="text-3xl font-semibold text-slate-900 md:text-4xl">{results.energy_score}</div>
              <div className="text-xs text-slate-500">out of 100</div>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-600 to-teal-500 transition-all"
                style={{ width: `${results.energy_score}%` }}
              />
            </div>
            <button
              type="button"
              onClick={() => setOpenCard(openCard === "energy" ? null : "energy")}
              className="mt-2 flex w-full items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:bg-slate-100"
            >
              <span>What this means</span>
              {openCard === "energy" ? (
                <ChevronUp className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              )}
            </button>
            {openCard === "energy" && (
              <p className="mt-2 text-xs text-slate-600">
                Mental energy reflects how resourced you are for attention, decision-making, and emotional regulation
                today.
              </p>
            )}
          </div>

          {/* Burnout Risk Card */}
          <div className="group rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 transition-colors hover:bg-slate-50">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-slate-100 p-2.5">
                  <Brain className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-semibold text-slate-900">Burnout Meter</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      A blended signal combining stress and recovery; best interpreted over time.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {burnoutRisk} range
              </span>
            </div>
            <div className="mb-4 flex items-baseline gap-2">
              <div className="text-3xl font-semibold text-slate-900 md:text-4xl">{results.burnout_meter}</div>
              <div className="text-xs text-slate-500">out of 100</div>
            </div>
            <div className="mb-3 flex gap-2">
              <div
                className={`h-2 flex-1 rounded-full ${
                  burnoutRisk === "Low" ? "bg-emerald-400" : "bg-slate-100"
                }`}
              />
              <div
                className={`h-2 flex-1 rounded-full ${
                  burnoutRisk === "Moderate" ? "bg-amber-400" : "bg-slate-100"
                }`}
              />
              <div
                className={`h-2 flex-1 rounded-full ${
                  burnoutRisk === "High" ? "bg-rose-500" : "bg-slate-100"
                }`}
              />
            </div>
            <button
              type="button"
              onClick={() => setOpenCard(openCard === "burnout" ? null : "burnout")}
              className="mt-2 flex w-full items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:bg-slate-100"
            >
              <span>What this means</span>
              {openCard === "burnout" ? (
                <ChevronUp className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              )}
            </button>
            {openCard === "burnout" && (
              <p className="mt-2 text-xs text-slate-600">
                Burnout meter blends sustained stress and reduced recovery. It is most useful when viewed over time
                rather than as a single value.
              </p>
            )}
          </div>
        </div>

        {/* Today’s Guidance */}
        <div className="mb-6 rounded-2xl bg-slate-100 p-5 shadow-sm">
          <p className="mb-2 text-sm font-medium text-slate-900">Today&apos;s Guidance</p>
          <ul className="space-y-1.5 text-xs text-slate-600 md:text-sm">
            <li>
              • Consider one short pause today to step away from screens and reset your attention.
            </li>
            <li>• A brief walk, stretch, or breathing pause can help reduce sustained emotional load.</li>
          </ul>
        </div>

        {/* CTA + Insight row */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-slate-100 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-900">Build a healthier emotional baseline.</p>
            <p className="text-xs text-slate-600 md:text-sm">
              Tracking these signals daily can reveal patterns in stress, energy, and recovery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={handleSaveToday}
              className="h-10 rounded-full bg-[#1E40AF] px-5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-[#1E3A8A]"
            >
              {hasSavedToday ? "Saved \u2713" : "Save today’s emotion"}
            </Button>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-full border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-slate-50"
                >
                  Track this daily
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Daily Emotional Tracking</DrawerTitle>
                  <DrawerDescription>
                    Daily tracking helps detect potential stress and burnout patterns earlier and more reliably.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-2 pt-1">
                  <p className="mb-3 text-xs text-slate-600 md:text-sm">
                    Below is an example of how your vitals could look over a week when tracked consistently.
                  </p>
                  <div className="flex items-end gap-1.5 rounded-2xl bg-slate-100 p-4">
                    {["M", "T", "W", "T", "F", "S", "S"].map((label, idx) => (
                      <div key={label} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-3 rounded-full bg-slate-300"
                          style={{ height: `${40 + idx * 6}px` }}
                        />
                        <span className="text-[11px] text-slate-500">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <DrawerFooter>
                  <Button
                    type="button"
                    className="h-10 rounded-full bg-[#1E40AF] text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-[#1E3A8A]"
                    onClick={() => {
                      toast({
                        title: "Daily reminders enabled (beta)",
                        description: "We’ll aim to nudge you to scan at about the same time each day.",
                      })
                    }}
                  >
                    Enable Daily Reminders
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Restart Button */}
        <div className="mb-6 flex justify-center">
          <Button
            onClick={onRestart}
            variant="outline"
            className="h-10 gap-2 rounded-full border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
            Take another scan
          </Button>
        </div>

        {/* Disclaimer & Trust Footer */}
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-xs text-slate-500 md:flex-row md:justify-between md:text-[11px]">
          <p className="max-w-xl text-[11px] md:text-left">
            This is an early wellness signal and is not intended for diagnosis, treatment, or as a substitute for
            clinical care.
          </p>
          <div className="mt-1 inline-flex items-center gap-1.5 text-[11px]">
            <Lock className="h-3.5 w-3.5" />
            <span>Privacy-first by design — scan signals are processed securely and are not stored.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
