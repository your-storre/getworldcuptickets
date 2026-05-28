'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Buy World Cup Tickets Securely</h1>
        <p className="text-xl mb-8">Trusted marketplace for football fans worldwide</p>
        <Link href="/matches" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold">Browse Tickets</Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Matches</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { home: "USA", away: "Mexico", date: "June 12, 2026", price: 199 },
            { home: "Brazil", away: "Argentina", date: "June 15, 2026", price: 249 },
            { home: "England", away: "Germany", date: "June 18, 2026", price: 219 }
          ].map((match, i) => (
            <div key={i} className="border rounded-lg p-6 text-center">
              <div className="text-xl font-bold">{match.home} vs {match.away}</div>
              <div className="text-gray-600 my-2">{match.date}</div>
              <div className="text-2xl font-bold text-blue-600">${match.price}</div>
              <Link href="/login" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded">Buy Now</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
