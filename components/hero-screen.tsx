\"use client\"

import { useState } from \"react\"
import { Button } from \"@/components/ui/button\"
import { Brain, Shield, Lock } from \"lucide-react\"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from \"@/components/ui/dialog\"

interface HeroScreenProps {
  onStart: () => void
}

export default function HeroScreen({ onStart }: HeroScreenProps) {
  const [sampleOpen, setSampleOpen] = useState(false)
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Minimal navbar */}
      <header className="flex items-center justify-between px-4 py-4 md:px-10 md:py-6">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
          <Brain className="h-5 w-5 text-[#1E40AF]" />
          <span className="text-sm font-semibold tracking-tight text-slate-900">EmoHealth AI</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="transition-colors hover:text-slate-900"
              >
                How this works
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-2xl border border-slate-200 bg-white">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold text-slate-900">How EmoHealth AI works</DialogTitle>
                <DialogDescription className="text-sm text-slate-600">
                  A short, structured scan that turns momentary signals into calm, interpretable wellness information.
                </DialogDescription>
              </DialogHeader>
              <ol className="mt-4 space-y-3 text-sm text-slate-700">
                <li>
                  <span className="font-semibold text-[#1E40AF]">1. 30-second camera & voice scan</span>
                  <p className="text-slate-600">
                    With your permission, we read a brief window of facial and voice signals.
                  </p>
                </li>
                <li>
                  <span className="font-semibold text-[#1E40AF]">2. Emotional signal processing</span>
                  <p className="text-slate-600">
                    Signals are transformed into approximate stress, energy, and burnout indicators.
                  </p>
                </li>
                <li>
                  <span className="font-semibold text-[#1E40AF]">3. Daily wellness insights</span>
                  <p className="text-slate-600">
                    Results are presented as early wellness signals to support reflection and daily habits.
                  </p>
                </li>
              </ol>
            </DialogContent>
          </Dialog>
          <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:bg-slate-50"
              >
                <Lock className="h-3.5 w-3.5" />
                Privacy
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-2xl border border-slate-200 bg-white">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold text-slate-900">Privacy and data handling</DialogTitle>
                <DialogDescription className="text-sm text-slate-600">
                  EmoHealth AI is designed to be privacy-first. Current scans are processed securely and are not stored.
                </DialogDescription>
              </DialogHeader>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>• Scans are used only to generate your momentary emotional vitals.</li>
                <li>• No raw video or audio is stored by this demo.</li>
                <li>• Results are wellness-oriented and non-diagnostic.</li>
              </ul>
            </DialogContent>
          </Dialog>
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-12 pt-4 md:pb-16">
        <div className="w-full max-w-2xl text-center">
          {/* Abstract Health Wave Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <svg
                width="220"
                height="130"
                viewBox="0 0 200 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-90 drop-shadow-sm"
              >
                <path
                  d="M0 60C20 40, 40 30, 60 40C80 50, 100 70, 120 60C140 50, 160 30, 180 40C190 45, 200 50, 200 50"
                  stroke="url(#gradient1)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M0 70C20 50, 40 40, 60 50C80 60, 100 80, 120 70C140 60, 160 40, 180 50C190 55, 200 60, 200 60"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="200" y2="0">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="200" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-3 text-balance text-3xl font-semibold tracking-tight text-[#0F172A] md:text-4xl lg:text-5xl">
            Understand your emotional health — daily.
          </h1>

          {/* Subheadline */}
          <p className="mb-4 text-pretty text-base text-[#64748B] md:text-lg">
            A 30-second scan using face and voice signals to generate emotional wellness insights.
          </p>

          {/* Trust strip */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#64748B] md:text-sm">
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
              <span>🔒</span>
              <span>Privacy-first</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
              <span>🧠</span>
              <span>AI-powered wellness</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
              <span>⚕️</span>
              <span>Not a medical diagnosis</span>
            </div>
          </div>

          {/* Privacy paragraph */}
          <p className="mb-8 text-sm text-[#64748B]">
            Your data stays private. Scans are processed securely and used only to generate your personal emotional
            vitals.
          </p>

          {/* CTAs */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={onStart}
              size="lg"
              className="h-11 rounded-full bg-[#1E40AF] px-8 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-[#1E3A8A] focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC]"
            >
              Start Emotional Scan
            </Button>

            <Dialog open={sampleOpen} onOpenChange={setSampleOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-full border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-slate-50"
                >
                  See Sample Results
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl rounded-2xl border border-slate-200 bg-white">
                <DialogHeader>
                  <DialogTitle className="text-base font-semibold text-slate-900">
                    Sample emotional vitals
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-600">
                    An example of what a typical 30-second scan might look like. Values are illustrative only.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4 shadow-sm">
                    <p className="text-xs font-medium text-slate-500">Stress Index</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">62</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "62%", backgroundImage: "linear-gradient(135deg,#1E40AF,#0D9488)" }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-600">Moderate load, worth monitoring across days.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 shadow-sm">
                    <p className="text-xs font-medium text-slate-500">Energy Score</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">74</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "74%", backgroundImage: "linear-gradient(135deg,#1E40AF,#0D9488)" }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-600">Reasonable capacity for focus today.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 shadow-sm">
                    <p className="text-xs font-medium text-slate-500">Burnout Meter</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">48</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "48%", backgroundImage: "linear-gradient(135deg,#1E40AF,#0D9488)" }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-600">Early signals; more useful when tracked over time.</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Trust badges */}
          {/* Secondary text */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 md:text-sm">
            <div className="flex items-center gap-1.5">
              <Lock className="h-4 w-4" />
              <span>Privacy-first by design</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="hidden items-center gap-1.5 md:flex">
              <Shield className="h-4 w-4" />
              <span>Wellness-focused, non-diagnostic</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}