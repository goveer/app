import { AuthForm } from '../components/auth/auth-form'
import Image from 'next/image'

export default function LoginPage() {
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

      {/* Auth Form */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AuthForm />
      </div>
    </div>
  )
}
