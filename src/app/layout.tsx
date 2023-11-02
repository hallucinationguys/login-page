import './globals.css'
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { AuthContextProvider } from 'src/contexts/authentication'

const inter = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Login Page',
  description: 'The System Guys ecosystem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  )
}
