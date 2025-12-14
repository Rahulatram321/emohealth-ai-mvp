"use client"

import { useEffect, useState } from "react"

interface ScanningScreenProps {
  onComplete: () => void
}

export default function ScanningScreen({ onComplete }: ScanningScreenProps) {
  const [countdown, setCountdown] = useState(30)
  const [message, setMessage] = useState("Analyzing facial signals…")

  useEffect(() => {
    const messages = [
      "Analyzing facial signals…",
      "Reading voice energy…",
      "Calculating emotional vitals…",
      "Processing results…",
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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        {/* Scanning Animation */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative h-48 w-48">
            {/* Outer rings */}
            <div
              className="absolute inset-0 animate-ping rounded-full bg-teal-400/20"
              style={{ animationDuration: "2s" }}
            />
            <div
              className="absolute inset-4 animate-ping rounded-full bg-teal-400/30"
              style={{ animationDuration: "2s", animationDelay: "0.3s" }}
            />

            {/* Main pulse circle */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 shadow-2xl shadow-teal-500/50">
              <div className="flex h-full items-center justify-center">
                <div className="rounded-full bg-white/90 px-6 py-4">
                  <div className="text-4xl font-bold text-gray-900">{countdown}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Message */}
        <h2 className="mb-2 text-2xl font-semibold text-gray-900">{message}</h2>
        <p className="text-gray-600">Please remain still and calm</p>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-1000 ease-linear"
              style={{ width: `${((30 - countdown) / 30) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
