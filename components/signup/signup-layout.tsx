import React from "react"
import Image from "next/image"

interface SignupLayoutProps {
  children: React.ReactNode
}

export function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 pointer-events-none">
        <Image
          src="/images/signup-bg.svg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8">
        <Image
          src="/images/veer-logo.svg"
          alt="Veer"
          width={120}
          height={40}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen py-8">
        {children}
      </div>
    </div>
  )
}
