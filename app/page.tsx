'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Calendar, MapPin, Ticket, Shield, Clock, Star, ChevronRight, CheckCircle, CreditCard, Headphones, TrendingUp, Award } from 'lucide-react'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const featuredMatches = [
    { id: 1, home: "USA", away: "Mexico", date: "June 12, 2026", time: "20:00", stadium: "MetLife Stadium", price: 199, image: "https://images.unsplash.com/photo-1522778526097-7b3edf3d0c03" },
    { id: 2, home: "Brazil", away: "Argentina", date: "June 15, 2026", time: "15:00", stadium: "SoFi Stadium", price: 249, image: "https://images.unsplash.com/photo-1578749556568-bc7b8c7be63b" },
    { id: 3, home: "England", away: "Germany", date: "June 18, 2026", time: "18:00", stadium: "AT&T Stadium", price: 219, image: "https://images.unsplash.com/photo-1559563452-1f6b7c4b0e45" },
    { id: 4, home: "France", away: "Spain", date: "June 21, 2026", time: "21:00", stadium: "Mercedes-Benz Stadium", price: 229, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9" },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522778526097-7b3edf3d0c03?q=80&w=2070')" }} />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">Buy World Cup Tickets <span className="text-blue-400">Securely</span></h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Trusted resale marketplace for football fans worldwide. 100% guaranteed tickets for all matches.</p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-2 flex gap-2">
              <input type="text" placeholder="Search matches, teams, or stadiums..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-600 text-gray-900 outline-none" />
              <Link href={`/matches?search=${searchQuery}`} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition">Search</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-green-600" /><span className="font-medium">100% Secure</span></div>
            <div className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-green-600" /><span className="font-medium">Instant Delivery</span></div>
            <div className="flex items-center gap-2"><Headphones className="w-5 h-5 text-green-600" /><span className="font-medium">24/7 Support</span></div>
            <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /><span className="font-medium">Best Price Guarantee</span></div>
          </div>
        </div>
      </section>

      {/* Featured Matches */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Matches</h2><p className="text-gray-600 text-lg">Secure your seats for the most anticipated matches</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMatches.map(match => (
              <Link href={`/matches/${match.id}`} key={match.id} className="card group">
                <div className="relative h-48"><Image src={match.image} alt={match.home} fill className="object-cover group-hover:scale-105 transition duration-300" /></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3"><span className="text-sm text-gray-500 flex items-center gap-1"><Calendar className="w-4 h-4" />{match.date}</span><span className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-4 h-4" />{match.stadium}</span></div>
                  <div className="text-center py-3"><div className="text-xl font-bold">{match.home} vs {match.away}</div></div>
                  <div className="flex justify-between items-center mt-4"><span className="text-2xl font-bold text-blue-600">${match.price}</span><span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">View Tickets →</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2><p className="text-gray-600 text-lg">The most trusted marketplace for World Cup tickets</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ icon: Shield, title: 'Secure Transactions', desc: 'Bank-level encryption and fraud protection' },{ icon: Ticket, title: 'Instant Delivery', desc: 'Receive QR codes immediately after purchase' },{ icon: Star, title: 'Best Price Guarantee', desc: 'Competitive pricing with no hidden fees' }].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><item.icon className="w-8 h-8 text-blue-600" /></div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3><p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Ticket Categories</h2><p className="text-gray-600 text-lg">Choose from various seating options</p></div>
          <div className="grid md:grid-cols-4 gap-6">
            {[{ name: 'VIP Experience', price: '$1,250', features: ['Premium seating', 'VIP lounge access', 'Complimentary refreshments'], color: 'from-yellow-500 to-yellow-600' },{ name: 'Premium', price: '$850', features: ['Lower bowl seating', 'Priority entry', 'Food & beverage credit'], color: 'from-gray-400 to-gray-500' },{ name: 'Standard', price: '$450', features: ['Mid-level seating', 'Standard entry', 'Match program included'], color: 'from-blue-500 to-blue-600' },{ name: 'Economy', price: '$199', features: ['Upper bowl seating', 'Standard entry', 'Digital ticket only'], color: 'from-green-500 to-green-600' }].map((cat, i) => (
              <div key={i} className="card p-6"><h3 className="text-2xl font-bold mb-2">{cat.name}</h3><div className="text-3xl font-bold text-blue-600 mb-4">{cat.price}</div><ul className="space-y-2 mb-6">{cat.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-gray-600 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />{f}</li>)}</ul><Link href="/matches" className="block text-center bg-gray-100 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">View Tickets</Link></div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2><p className="text-gray-600 text-lg">Trusted by thousands of football fans worldwide</p></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[{ name: 'David Chen', location: 'Toronto, Canada', comment: 'Got my tickets for the final within minutes! Best World Cup experience ever!', rating: 5 },{ name: 'Maria Rodriguez', location: 'Madrid, Spain', comment: 'Excellent customer service. Highly recommend!', rating: 5 },{ name: 'James Wilson', location: 'London, UK', comment: 'Best ticket platform I\'ve used. Smooth checkout process.', rating: 5 }].map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm"><div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div><p className="text-gray-700 mb-3">"{t.comment}"</p><div className="font-semibold">{t.name}</div><div className="text-sm text-gray-500">{t.location}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience World Cup 2026?</h2>
          <p className="text-xl mb-8">Don't miss out on the biggest sporting event in the world</p>
          <Link href="/matches" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2">Browse Tickets <Ticket className="w-5 h-5" /></Link>
        </div>
      </section>
    </div>
  )
}