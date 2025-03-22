import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'xRouter',
  description: 'AI-Routed Futures',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  generator: 'xRouter.ai',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
