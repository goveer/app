import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/ui/theme-provider"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans'
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ['400', '500', '600'],
  variable: '--font-mono'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          ibmPlexSans.variable,
          ibmPlexMono.variable,
          "font-sans min-h-screen bg-background antialiased"
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
