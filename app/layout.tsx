import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Ticket } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'GetWorldCupTicket',
  description: 'World Cup 2026 Tickets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Ticket className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl">GetWorldCupTicket</span>
              </Link>
              <div className="flex space-x-6">
                <Link href="/matches" className="text-gray-700 hover:text-blue-600">Matches</Link>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">Sign In</Link>
                <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign Up</Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
