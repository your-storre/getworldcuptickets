'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Search, Filter } from 'lucide-react'

export default function MatchesPage() {
  const [filter, setFilter] = useState('all')
  
  const matches = [
    { id: 1, home: "USA", away: "Mexico", date: "2026-06-12", time: "20:00", stadium: "MetLife Stadium", city: "East Rutherford", stage: "Group A", price: 199, available: 3420 },
    { id: 2, home: "Brazil", away: "Argentina", date: "2026-06-15", time: "15:00", stadium: "SoFi Stadium", city: "Inglewood", stage: "Group B", price: 249, available: 2850 },
    { id: 3, home: "England", away: "Germany", date: "2026-06-18", time: "18:00", stadium: "AT&T Stadium", city: "Arlington", stage: "Group C", price: 219, available: 3100 },
    { id: 4, home: "France", away: "Spain", date: "2026-06-21", time: "21:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta", stage: "Group D", price: 229, available: 2950 },
    { id: 5, home: "Portugal", away: "Netherlands", date: "2026-06-24", time: "16:00", stadium: "Levi's Stadium", city: "Santa Clara", stage: "Group E", price: 199, available: 4100 },
    { id: 6, home: "Italy", away: "Belgium", date: "2026-06-27", time: "14:00", stadium: "Gillette Stadium", city: "Foxborough", stage: "Group F", price: 189, available: 3800 },
    { id: 7, home: "Japan", away: "South Korea", date: "2026-06-30", time: "19:00", stadium: "Lumen Field", city: "Seattle", stage: "Group G", price: 169, available: 4500 },
    { id: 8, home: "Winner A", away: "Runner-up B", date: "2026-07-04", time: "12:00", stadium: "Hard Rock Stadium", city: "Miami", stage: "Round of 16", price: 299, available: 2800 },
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12"><h1 className="text-4xl md:text-5xl font-bold mb-4">World Cup 2026 Matches</h1><p className="text-gray-600 text-lg">All matches, venues, and ticket availability</p></div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2"><Filter className="w-5 h-5 text-gray-500" /><span className="font-medium">Filter by Stage:</span></div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Group Stage', 'Round of 16', 'Quarter Final', 'Semi Final', 'Final'].map(s => <button key={s} onClick={() => setFilter(s.toLowerCase())} className={`px-4 py-2 rounded-lg text-sm ${filter === s.toLowerCase() ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{s}</button>)}
          </div>
          <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="text" placeholder="Search teams..." className="pl-10 pr-4 py-2 border rounded-lg w-64" /></div>
        </div>

        {/* Matches Grid */}
        <div className="grid gap-4">
          {matches.map(match => (
            <Link href={`/matches/${match.id}`} key={match.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex-1"><div className="text-sm text-gray-500 mb-2">{match.stage}</div><div className="text-xl font-bold">{match.home} vs {match.away}</div><div className="flex gap-4 mt-2 text-sm text-gray-500"><span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {match.time}</span><span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{match.stadium}, {match.city}</span></div></div>
                <div className="text-right"><div className="text-2xl font-bold text-blue-600">${match.price}</div><div className="text-sm text-gray-500">{match.available} tickets left</div><div className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition">Buy Tickets</div></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
