'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Calendar, MapPin, Ticket, ChevronRight, Star, Users, Clock, Shield, CreditCard, Headphones, CheckCircle, TrendingUp, Award, Eye, Heart, Share2, Filter, SlidersHorizontal } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchMatches()
  }, [])

  async function fetchMatches() {
    // Fetch real matches from Supabase
    const { data } = await supabase
      .from('matches')
      .select('*')
      .order('match_date', { ascending: true })
      .limit(6)
    
    if (data && data.length > 0) {
      setMatches(data)
    } else {
      // Sample data while database populates
      setMatches([
        { id: 1, home_team: "USA", away_team: "Mexico", match_date: "2026-06-12", kickoff_time: "20:00", stadium: "MetLife Stadium", city: "East Rutherford", stage: "Group A", price: 199, image: "https://images.unsplash.com/photo-1522778526097-7b3edf3d0c03" },
        { id: 2, home_team: "Brazil", away_team: "Argentina", match_date: "2026-06-15", kickoff_time: "15:00", stadium: "SoFi Stadium", city: "Inglewood", stage: "Group B", price: 249, image: "https://images.unsplash.com/photo-1578749556568-bc7b8c7be63b" },
        { id: 3, home_team: "England", away_team: "Germany", match_date: "2026-06-18", kickoff_time: "18:00", stadium: "AT&T Stadium", city: "Arlington", stage: "Group C", price: 219, image: "https://images.unsplash.com/photo-1559563452-1f6b7c4b0e45" },
        { id: 4, home_team: "France", away_team: "Spain", match_date: "2026-06-21", kickoff_time: "21:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta", stage: "Group D", price: 229, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9" },
        { id: 5, home_team: "Portugal", away_team: "Netherlands", match_date: "2026-06-24", kickoff_time: "16:00", stadium: "Levi's Stadium", city: "Santa Clara", stage: "Group E", price: 199, image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2" },
        { id: 6, home_team: "Italy", away_team: "Belgium", match_date: "2026-06-27", kickoff_time: "14:00", stadium: "Gillette Stadium", city: "Foxborough", stage: "Group F", price: 189, image: "https://images.unsplash.com/photo-1459867261681-c2b4d1fea0b4" }
      ])
    }
    setLoading(false)
  }

  const ticketCategories = [
    { name: "VIP Experience", price: "From $1,250", features: ["Premium Seating", "VIP Lounge Access", "Complimentary Drinks", "Dedicated Concierge"], color: "from-yellow-500 to-yellow-600", icon: "👑", badge: "BEST VIEW" },
    { name: "Premium", price: "From $850", features: ["Lower Bowl Seating", "Priority Entry", "Food & Beverage Credit", "Commemorative Ticket"], color: "from-gray-400 to-gray-500", icon: "⭐", badge: "POPULAR" },
    { name: "Standard", price: "From $450", features: ["Mid-Level Seating", "Standard Entry", "Match Program", "Digital Ticket"], color: "from-blue-500 to-blue-600", icon: "🎫", badge: "VALUE" },
    { name: "Economy", price: "From $199", features: ["Upper Bowl Seating", "Standard Entry", "Digital Ticket Only"], color: "from-green-500 to-green-600", icon: "💰", badge: "BUDGET" }
  ]

  return (
    <div>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1522778526097-7b3edf3d0c03"
          >
            <source src="https://cdn.coverr.co/videos/coverr-football-stadium-1575298292914/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
        </div>

        <div className="relative z-10 container-custom text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Clock className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">FIFA World Cup 2026 • USA, Canada, Mexico</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in leading-tight">
              Buy World Cup Tickets
              <span className="text-yellow-400"> Securely</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Trusted resale marketplace for football fans worldwide. 
              100% guaranteed tickets for all matches.
            </p>

            {/* Search Bar with Stadium Background */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search matches, teams, or stadiums..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Tickets
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center"><div className="text-3xl font-bold">50+</div><div className="text-sm text-gray-300">Matches</div></div>
              <div className="text-center"><div className="text-3xl font-bold">16</div><div className="text-sm text-gray-300">Stadiums</div></div>
              <div className="text-center"><div className="text-3xl font-bold">100k+</div><div className="text-sm text-gray-300">Fans Served</div></div>
              <div className="text-center"><div className="text-3xl font-bold">24/7</div><div className="text-sm text-gray-300">Support</div></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Matches with Stadium Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Matches</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Secure your seats for the most anticipated matches of World Cup 2026</p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-2xl shadow-lg h-96 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match: any) => (
                <Link href={`/matches/${match.id}`} key={match.id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-56 overflow-hidden">
                      <Image src={match.image} alt={match.home_team} fill className="object-cover group-hover:scale-110 transition duration-500" />
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">{match.stage}</div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex justify-between items-center text-white">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(match.match_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{match.kickoff_time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-center flex-1">
                          <div className="font-bold text-lg">{match.home_team}</div>
                        </div>
                        <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mx-2">VS</div>
                        <div className="text-center flex-1">
                          <div className="font-bold text-lg">{match.away_team}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{match.stadium}, {match.city}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">${match.price}</span>
                          <span className="text-gray-500 text-sm"> / ticket</span>
                        </div>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-blue-700 transition flex items-center gap-1">
                          View Details <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/matches" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              View All Matches <TrendingUp className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ticket Categories with Seat Map Style */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ticket Categories</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Choose your perfect seat from our premium selection</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ticketCategories.map((category, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-4">{category.price}</div>
                <ul className="space-y-2 mb-6">
                  {category.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/matches" className="block text-center bg-yellow-500 text-gray-900 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition">
                  View Tickets
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Seat Map Preview */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Interactive Seat Map</h2>
              <p className="text-gray-600 text-lg mb-6">Choose your perfect view with our interactive stadium seating map. See exactly where you'll be sitting before you buy.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><div className="font-semibold">Category 1 - VIP</div><div className="text-sm text-gray-500">Best views, premium amenities</div></div>
                  <div className="text-right"><div className="text-2xl font-bold text-blue-600">$1,250</div><div className="text-sm text-gray-500">per ticket</div></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><div className="font-semibold">Category 2 - Premium</div><div className="text-sm text-gray-500">Excellent views, comfort seating</div></div>
                  <div className="text-right"><div className="text-2xl font-bold text-blue-600">$850</div><div className="text-sm text-gray-500">per ticket</div></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><div className="font-semibold">Category 3 - Standard</div><div className="text-sm text-gray-500">Good views, great value</div></div>
                  <div className="text-right"><div className="text-2xl font-bold text-blue-600">$450</div><div className="text-sm text-gray-500">per ticket</div></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><div className="font-semibold">Category 4 - Economy</div><div className="text-sm text-gray-500">Budget-friendly seating</div></div>
                  <div className="text-right"><div className="text-2xl font-bold text-blue-600">$199</div><div className="text-sm text-gray-500">per ticket</div></div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-8">
                <div className="relative">
                  <div className="w-full h-96 bg-gradient-to-t from-green-800 to-green-600 rounded-t-full relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">🏟️</div>
                        <div className="text-xl font-bold">MetLife Stadium</div>
                        <div className="text-sm opacity-75">East Rutherford, NJ</div>
                      </div>
                    </div>
                    {/* Seat sections */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around p-4">
                      <div className="text-center text-white text-xs"><div className="w-8 h-8 bg-yellow-500 rounded-lg mx-auto mb-1"></div>VIP</div>
                      <div className="text-center text-white text-xs"><div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-1"></div>Premium</div>
                      <div className="text-center text-white text-xs"><div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-1"></div>Standard</div>
                      <div className="text-center text-white text-xs"><div className="w-8 h-8 bg-gray-500 rounded-lg mx-auto mb-1"></div>Economy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose GetWorldCupTicket</h2>
            <p className="text-gray-600 text-lg">The most trusted marketplace for World Cup tickets</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Secure Transactions', desc: 'Bank-level encryption and fraud protection for all payments', color: 'blue' },
              { icon: Ticket, title: 'Instant Ticket Delivery', desc: 'Receive QR codes immediately after purchase via email', color: 'green' },
              { icon: Star, title: 'Best Price Guarantee', desc: 'Competitive pricing with no hidden fees', color: 'purple' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition">
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Fans Say</h2>
            <p className="text-gray-600 text-lg">Trusted by thousands of football fans worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'David Chen', location: 'Toronto, Canada', comment: 'Got my tickets for the final within minutes! The QR code worked perfectly. Best World Cup experience ever!', rating: 5, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
              { name: 'Maria Rodriguez', location: 'Madrid, Spain', comment: 'Excellent customer service. Had an issue with my booking and they resolved it immediately. Highly recommend!', rating: 5, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
              { name: 'James Wilson', location: 'London, UK', comment: 'Best ticket platform I\'ve used. Smooth checkout process and instant delivery. Will use again for sure.', rating: 5, image: 'https://randomuser.me/api/portraits/men/3.jpg' }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <span className="text-2xl font-bold text-yellow-500">★★★★★</span>
              <span>4.9 out of 5 based on 2,847 reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience World Cup 2026?</h2>
          <p className="text-xl mb-8 text-blue-100">Don't miss out on the biggest sporting event in the world</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/matches" className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2">
              Browse Tickets <Ticket className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition inline-flex items-center gap-2">
              Contact Sales <Headphones className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Get the latest match schedules, ticket releases, and exclusive offers</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">Subscribe</button>
          </form>
          <p className="text-xs text-gray-500 mt-4">No spam, unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  )
}
