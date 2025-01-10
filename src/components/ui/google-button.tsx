import { Button } from "@/components/ui/button"
import Image from "next/image"

interface GoogleButtonProps {
  onClick?: () => Promise<void>
  isLoading?: boolean
  text?: string
}

export function GoogleButton({ 
  onClick, 
  isLoading = false,
  text = "Continue with Google"
}: GoogleButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-white hover:bg-gray-50 text-gray-900 hover:text-gray-900 gap-2"
    >
      <Image
        src="/images/google.svg"
        alt="Google"
        width={20}
        height={20}
        className="h-5 w-5"
      />
      {text}
    </Button>
  )
} 