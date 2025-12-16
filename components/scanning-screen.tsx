"use client"

import { useEffect, useState } from "react"

interface ScanningScreenProps {
  onComplete: () => void
}

export default function ScanningScreen({ onComplete }: ScanningScreenProps) {
  const [countdown, setCountdown] = useState(30)
  const [message, setMessage] = useState("Settling your baseline…")

  useEffect(() => {
    const messages = [
      "Analyzing facial cues…",
      "Reading voice patterns…",
      "Balancing signal noise…",
      "Generating emotional vitals…",
    ]
    let messageIndex = 0

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length
      setMessage(messages[messageIndex])
    }, 7000)

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          clearInterval(messageInterval)
          setTimeout(onComplete, 500)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(messageInterval)
      clearInterval(countdownInterval)
    }
  }, [onComplete])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md text-center">
        {/* Scanning Animation */}
        <div className="relative mb-10 flex justify-center">
          <div className="relative h-52 w-52">
            {/* Circular progress ring */}
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                className="stroke-slate-200"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                className="stroke-blue-600 transition-all duration-300 ease-out"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - (30 - countdown) / 30)}
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-8 rounded-full bg-white shadow-md shadow-slate-200">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="mb-1 text-xs uppercase tracking-[0.16em] text-sky-600">Time remaining</div>
                <div className="text-4xl font-semibold text-slate-900">{countdown}</div>
                <div className="mt-1 text-[11px] text-slate-500">seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Message */}
        <h2 className="mb-2 text-xl font-semibold text-slate-900 md:text-2xl">{message}</h2>
        <p className="text-sm text-slate-500 md:text-base">
          Sit comfortably, keep your face in view, and breathe as you normally would.
        </p>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-teal-500 transition-all duration-300 ease-linear"
              style={{ width: `${((30 - countdown) / 30) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            We never store your video or audio. Signals are processed securely in real time.
          </p>
        </div>
      </div>
    </div>
  )
}
