'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MatchesPage() {
  const matches = [
    { id: 1, home: "USA", away: "Mexico", date: "2026-06-12", stadium: "MetLife Stadium", price: 199 },
    { id: 2, home: "Brazil", away: "Argentina", date: "2026-06-15", stadium: "SoFi Stadium", price: 249 },
    { id: 3, home: "England", away: "Germany", date: "2026-06-18", stadium: "AT&T Stadium", price: 219 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">World Cup 2026 Matches</h1>
      <div className="grid gap-4">
        {matches.map(match => (
          <div key={match.id} className="border rounded-lg p-6 flex justify-between items-center">
            <div>
              <div className="text-xl font-bold">{match.home} vs {match.away}</div>
              <div className="text-gray-600">{match.date} at {match.stadium}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">${match.price}</div>
              <Link href="/login" className="text-blue-600 hover:underline">Buy Tickets →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
