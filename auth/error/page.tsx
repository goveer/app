import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">Authentication Error</h1>
          <p className="text-gray-600">
            There was a problem with the authentication process. This could be because:
          </p>
          <ul className="text-left text-gray-600 list-disc pl-6 space-y-2">
            <li>The verification link has expired</li>
            <li>The link has already been used</li>
            <li>The verification code is invalid</li>
          </ul>
          <div className="pt-4">
            <Link href="/signup">
              <Button className="w-full">
                Return to Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
