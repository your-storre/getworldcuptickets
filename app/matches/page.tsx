'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Search, Filter, SlidersHorizontal, ChevronDown, Star, Clock, Ticket as TicketIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function MatchesPage() {
  const [matches, setMatches] = useState([])
  const [filteredMatches, setFilteredMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStage, setSelectedStage] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })
  const [showFilters, setShowFilters] = useState(false)

  const stages = ['all', 'Group Stage', 'Round of 16', 'Quarter Final', 'Semi Final', 'Final']

  useEffect(() => {
    fetchMatches()
  }, [])

  useEffect(() => {
    filterAndSortMatches()
  }, [matches, searchTerm, selectedStage, sortBy, priceRange])

  async function fetchMatches() {
    const { data } = await supabase
      .from('matches')
      .select('*')
      .order('match_date', { ascending: true })
    
    if (data && data.length > 0) {
      setMatches(data)
    } else {
      setMatches([
        { id: 1, home_team: "USA", away_team: "Mexico", match_date: "2026-06-12", kickoff_time: "20:00", stadium: "MetLife Stadium", city: "East Rutherford", stage: "Group Stage", price: 199, image: "https://images.unsplash.com/photo-1522778526097-7b3edf3d0c03", available: 3420 },
        { id: 2, home_team: "Brazil", away_team: "Argentina", match_date: "2026-06-15", kickoff_time: "15:00", stadium: "SoFi Stadium", city: "Inglewood", stage: "Group Stage", price: 249, image: "https://images.unsplash.com/photo-1578749556568-bc7b8c7be63b", available: 2850 },
        { id: 3, home_team: "England", away_team: "Germany", match_date: "2026-06-18", kickoff_time: "18:00", stadium: "AT&T Stadium", city: "Arlington", stage: "Group Stage", price: 219, image: "https://images.unsplash.com/photo-1559563452-1f6b7c4b0e45", available: 3100 },
        { id: 4, home_team: "France", away_team: "Spain", match_date: "2026-06-21", kickoff_time: "21:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta", stage: "Group Stage", price: 229, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9", available: 2950 },
        { id: 5, home_team: "Portugal", away_team: "Netherlands", match_date: "2026-06-24", kickoff_time: "16:00", stadium: "Levi's Stadium", city: "Santa Clara", stage: "Group Stage", price: 199, image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2", available: 4100 },
        { id: 6, home_team: "Italy", away_team: "Belgium", match_date: "2026-06-27", kickoff_time: "14:00", stadium: "Gillette Stadium", city: "Foxborough", stage: "Group Stage", price: 189, image: "https://images.unsplash.com/photo-1459867261681-c2b4d1fea0b4", available: 3800 },
        { id: 7, home_team: "Japan", away_team: "South Korea", match_date: "2026-06-30", kickoff_time: "19:00", stadium: "Lumen Field", city: "Seattle", stage: "Group Stage", price: 169, image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d", available: 4500 },
        { id: 8, home_team: "Winner A", away_team: "Runner-up B", match_date: "2026-07-04", kickoff_time: "12:00", stadium: "Hard Rock Stadium", city: "Miami", stage: "Round of 16", price: 299, image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d", available: 2800 },
        { id: 9, home_team: "Winner C", away_team: "Runner-up D", match_date: "2026-07-05", kickoff_time: "15:00", stadium: "NRG Stadium", city: "Houston", stage: "Round of 16", price: 299, image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d", available: 2650 },
        { id: 10, home_team: "Quarter Final 1", away_team: "Quarter Final 2", match_date: "2026-07-10", kickoff_time: "20:00", stadium: "Arrowhead Stadium", city: "Kansas City", stage: "Quarter Final", price: 399, image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d", available: 2200 }
      ])
    }
    setLoading(false)
  }

  function filterAndSortMatches() {
    let filtered = [...matches]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.away_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.stadium.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Stage filter
    if (selectedStage !== 'all') {
      filtered = filtered.filter(m => m.stage === selectedStage)
    }

    // Price filter
    filtered = filtered.filter(m => m.price >= priceRange.min && m.price <= priceRange.max)

    // Sorting
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime())
    } else if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price)
    }

    setFilteredMatches(filtered)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">World Cup 2026 Matches</h1>
          <p className="text-gray-600 text-lg">All matches, venues, and ticket availability</p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by team or stadium..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="date">Sort by Date</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Match Stage</label>
                  <div className="flex flex-wrap gap-2">
                    {stages.map(stage => (
                      <button
                        key={stage}
                        onClick={() => setSelectedStage(stage)}
                        className={`px-3 py-1 rounded-full text-sm transition ${selectedStage === stage ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {stage === 'all' ? 'All Matches' : stage}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="w-24 px-3 py-2 border border-gray-200 rounded-lg"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-24 px-3 py-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">Found {filteredMatches.length} matches</p>
          <button className="text-blue-600 text-sm hover:underline">Clear all filters</button>
        </div>

        {/* Matches Grid */}
        {loading ? (
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => <div key={i} className="bg-white rounded-xl shadow-md h-32 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredMatches.map((match: any) => (
              <Link href={`/matches/${match.id}`} key={match.id}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-48 h-32 md:h-auto overflow-hidden">
                      <Image src={match.image} alt={match.home_team} fill className="object-cover group-hover:scale-105 transition duration-500" />
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">{match.stage}</div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-sm text-gray-500 flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(match.match_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span className="text-sm text-gray-500 flex items-center gap-1"><Clock className="w-4 h-4" />{match.kickoff_time}</span>
                          </div>
                          <div className="flex items-center gap-4 mb-2">
                            <span className="font-bold text-lg">{match.home_team}</span>
                            <span className="text-gray-400">vs</span>
                            <span className="font-bold text-lg">{match.away_team}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{match.stadium}, {match.city}</span>
                          </div>
                        </div>
                        <div className="text-right mt-4 md:mt-0">
                          <div className="text-2xl font-bold text-blue-600">${match.price}</div>
                          <div className="text-sm text-gray-500">{match.available} tickets left</div>
                          <div className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition inline-flex items-center gap-1">
                            Select Tickets <TicketIcon className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredMatches.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No matches found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
