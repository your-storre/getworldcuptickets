import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Ticket, User, ShoppingCart, Menu, X } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GetWorldCupTicket - Official World Cup 2026 Ticket Marketplace',
  description: 'Buy and sell FIFA World Cup 2026 tickets securely. Best prices for all matches including finals, semi-finals, and group stages.',
  keywords: 'World Cup tickets, FIFA 2026, football tickets, World Cup USA',
  openGraph: {
    title: 'GetWorldCupTicket - World Cup 2026 Tickets',
    description: 'Secure marketplace for FIFA World Cup 2026 tickets',
    url: 'https://getworldcupticket.com',
    siteName: 'GetWorldCupTicket',
    images: [{ url: 'https://images.unsplash.com/photo-1522778526097-7b3edf3d0c03', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl">GetWorldCupTicket</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/matches" className="text-gray-700 hover:text-blue-600 transition">Matches</Link>
            <Link href="/stadiums" className="text-gray-700 hover:text-blue-600 transition">Stadiums</Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">Support</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>
            <Link href="/login" className="btn-primary !py-2 !px-4 text-sm">Sign In</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">GetWorldCupTicket</h3>
            <p className="text-gray-400 text-sm">The trusted marketplace for World Cup 2026 tickets.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/matches" className="hover:text-white">Matches</Link></li>
              <li><Link href="/stadiums" className="hover:text-white">Stadiums</Link></li>
              <li><Link href="/tickets" className="hover:text-white">Tickets</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 GetWorldCupTicket.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}