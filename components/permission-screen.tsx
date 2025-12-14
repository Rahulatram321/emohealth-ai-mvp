"use client"

import { Button } from "@/components/ui/button"
import { Camera, Mic, Shield } from "lucide-react"

interface PermissionScreenProps {
  onAllow: () => void
}

export default function PermissionScreen({ onAllow }: PermissionScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5 md:p-12">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-teal-50 p-4">
              <Shield className="h-8 w-8 text-teal-600" />
            </div>
          </div>

          <h2 className="mb-3 text-center text-2xl font-bold text-gray-900 md:text-3xl">Permission Required</h2>

          <p className="mb-8 text-center text-gray-600">We only analyze signals locally for this scan</p>

          {/* Permission Items */}
          <div className="mb-8 space-y-4">
            <div className="flex items-start gap-4 rounded-2xl bg-blue-50/50 p-4">
              <div className="rounded-full bg-white p-2 shadow-sm">
                <Camera className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Camera Access</h3>
                <p className="text-sm text-gray-600">To analyze facial micro-expressions and emotional signals</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-teal-50/50 p-4">
              <div className="rounded-full bg-white p-2 shadow-sm">
                <Mic className="h-5 w-5 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Microphone Access</h3>
                <p className="text-sm text-gray-600">To measure voice energy and speech patterns</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={onAllow}
            className="h-12 w-full rounded-full bg-teal-600 text-base font-semibold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700"
          >
            Allow & Continue
          </Button>

          <p className="mt-4 text-center text-xs text-gray-500">Your data is processed locally and never stored</p>
        </div>
      </div>
    </div>
  )
}
