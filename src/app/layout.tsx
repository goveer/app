import { IBM_Plex_Sans as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Metadata } from 'next'

const defaultUrl = process.env.NEXT_PUBLIC_URL as string || "http://localhost:3000";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: 'Veer',
    template: '%s | Veer'
  },
  description: 'Intelligent scheduling and routing for healthcare professionals',
  keywords: ['healthcare', 'scheduling', 'routing', 'optimization'],
  authors: [{ name: 'Veer' }],
  openGraph: {
    title: 'Veer',
    description: 'Intelligent scheduling and routing for healthcare professionals',
    url: 'https://veer.health',
    siteName: 'Veer',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(
      "min-h-screen bg-background antialiased",
      fontSans.variable
    )}>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
