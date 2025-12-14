"use client"

import { Button } from "@/components/ui/button"
import { Brain, Shield, Lock } from "lucide-react"

interface HeroScreenProps {
  onStart: () => void
}

export default function HeroScreen({ onStart }: HeroScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow-sm ring-1 ring-black/5">
            <Brain className="h-6 w-6 text-teal-600" />
            <span className="font-semibold text-gray-900">EmoHealth AI</span>
          </div>
        </div>

        {/* Abstract Health Wave Illustration */}
        <div className="mb-8 flex justify-center">
          <svg
            width="200"
            height="120"
            viewBox="0 0 200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-80"
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
              opacity="0.6"
            />
            <defs>
              <linearGradient id="gradient1" x1="0" y1="0" x2="200" y2="0">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0" y1="0" x2="200" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Scan Your Emotional Health in 30 Seconds
        </h1>

        {/* Subtext */}
        <p className="mb-8 text-pretty text-lg text-gray-600 md:text-xl">
          AI-powered early emotional signals for stress, burnout and mental energy
        </p>

        {/* Primary CTA */}
        <Button
          onClick={onStart}
          size="lg"
          className="mb-4 h-14 rounded-full bg-teal-600 px-8 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/30"
        >
          Start Emotional Scan
        </Button>

        {/* Secondary text */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Lock className="h-4 w-4" />
            <span>Private</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Shield className="h-4 w-4" />
            <span>Secure</span>
          </div>
          <span>•</span>
          <span>Non-diagnostic (Beta)</span>
        </div>
      </div>
    </div>
  )
}
