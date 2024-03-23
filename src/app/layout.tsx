'use client'

import './globals.css'
import { Nunito_Sans } from 'next/font/google'
import { AuthContextProvider } from 'src/contexts/authentication'
import { Toaster } from '@/components/ui/toaster'

const inter = Nunito_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Login page</title>
        <meta
          content="Login service from Hallucination Guys"
          name="description"
        />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
          <Toaster />
        </AuthContextProvider>
      </body>
    </html>
  )
}
