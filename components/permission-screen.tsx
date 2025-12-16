"use client"

import { Button } from "@/components/ui/button"
import { Camera, Mic, Shield, Lock } from "lucide-react"

interface PermissionScreenProps {
  onAllow: () => void
}

export default function PermissionScreen({ onAllow }: PermissionScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="rounded-2xl bg-slate-50 p-8 shadow-lg ring-1 ring-slate-200 md:p-10">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-slate-100 p-3">
              <Shield className="h-6 w-6 text-sky-600" />
            </div>
          </div>

          <h2 className="mb-3 text-center text-2xl font-semibold text-slate-900 md:text-3xl">
            To run this scan, we&apos;ll briefly use your camera and microphone
          </h2>

          <p className="mb-7 text-center text-sm text-slate-600 md:text-base">
            EmoHealth AI reads short, live signals to estimate your emotional vitals. Nothing is recorded, and nothing
            is stored.
          </p>

          {/* Permission Items */}
          <div className="mb-7 space-y-4">
            <div className="flex items-start gap-4 rounded-2xl bg-slate-100 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <Camera className="h-5 w-5 text-sky-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">Camera access</h3>
                <p className="text-sm text-slate-600">
                  Used briefly to read facial cues linked to stress and emotional load.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-slate-100 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <Mic className="h-5 w-5 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">Microphone access</h3>
                <p className="text-sm text-slate-600">
                  Listens to short voice patterns to estimate energy and tension in your speech.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={onAllow}
            className="h-12 w-full rounded-full bg-blue-600 text-sm font-semibold text-white shadow-md shadow-slate-300 transition-colors duration-200 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          >
            Allow and begin 30‑second scan
          </Button>

          <div className="mt-4 flex flex-col items-center gap-1 text-xs text-slate-500">
            <div className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              <span>Signals are processed securely for this session only and are not stored.</span>
            </div>
            <p className="text-[11px] text-slate-400">This is an early wellness signal, not a medical diagnosis.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
