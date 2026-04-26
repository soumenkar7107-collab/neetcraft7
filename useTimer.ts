import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NEETCraft — NEET 2025 Study Dashboard',
  description: 'Premium study dashboard for NEET preparation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
