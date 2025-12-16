"use client"

import { useState } from "react"
import HeroScreen from "@/components/hero-screen"
import PermissionScreen from "@/components/permission-screen"
import ScanningScreen from "@/components/scanning-screen"
import ResultsDashboard from "@/components/results-dashboard"

interface ScanResults {
  stress_index: number
  energy_score: number
  burnout_meter: number
  explanation: string
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"hero" | "permission" | "scanning" | "loading" | "results" | "error">("hero")
  const [scanResults, setScanResults] = useState<ScanResults | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleScanComplete = async () => {
    setCurrentScreen("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data: ScanResults = await response.json()
      setScanResults(data)
      setCurrentScreen("results")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to fetch scan results")
      setCurrentScreen("error")
    }
  }

  const handleRestart = () => {
    setCurrentScreen("hero")
    setScanResults(null)
    setErrorMessage("")
  }

  return (
    <main className="min-h-screen">
      {currentScreen === "hero" && <HeroScreen onStart={() => setCurrentScreen("permission")} />}
      {currentScreen === "permission" && <PermissionScreen onAllow={() => setCurrentScreen("scanning")} />}
      {currentScreen === "scanning" && <ScanningScreen onComplete={handleScanComplete} />}
      {currentScreen === "loading" && (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
            <p className="text-lg font-medium text-gray-900">Processing your scan results...</p>
          </div>
        </div>
      )}
      {currentScreen === "error" && (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
            <div className="mb-4 text-5xl">⚠️</div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong</h2>
            <p className="mb-6 text-gray-600">{errorMessage || "Failed to fetch scan results"}</p>
            <button
              onClick={handleRestart}
              className="rounded-full bg-teal-600 px-6 py-3 text-base font-semibold text-white hover:bg-teal-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      {currentScreen === "results" && scanResults && (
        <ResultsDashboard results={scanResults} onRestart={handleRestart} />
      )}
    </main>
  )
}
