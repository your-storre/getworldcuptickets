'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Calendar, Clock, MapPin, Users, CreditCard, Shield, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MatchDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [match, setMatch] = useState<any>(null)
    const [tickets, setTickets] = useState<any[]>([])
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMatchDetails()
    }, [id])

    async function fetchMatchDetails() {
        // Fetch match data
        const { data: matchData } = await supabase
            .from('matches')
            .select('*')
            .eq('id', id)
            .single()

        // Fetch ticket inventory
        const { data: ticketData } = await supabase
            .from('tickets')
            .select('*')
            .eq('match_id', id)

        setMatch(matchData)
        setTickets(ticketData || [])
        setLoading(false)
    }

    function addToCart(ticketId: string) {
        setSelectedTickets(prev => ({ ...prev, [ticketId]: (prev[ticketId] || 0) + 1 }))
        toast.success('Added to cart')
    }

    function getCartTotal() {
        let total = 0
        Object.entries(selectedTickets).forEach(([ticketId, qty]) => {
            const ticket = tickets.find(t => t.id === ticketId)
            if (ticket) total += ticket.price * qty
        })
        return total
    }

    async function handleCheckout() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            toast.error('Please login to continue')
            router.push('/login')
            return
        }

        // Create order
        const orderNumber = 'WC' + Date.now()
        const { data: order, error } = await supabase
            .from('orders')
            .insert([{
                user_id: user.id,
                order_number: orderNumber,
                total_amount: getCartTotal(),
                status: 'pending'
            }])
            .select()
            .single()

        if (error) {
            toast.error('Error creating order')
            return
        }

        // Store order items
        for (const [ticketId, qty] of Object.entries(selectedTickets)) {
            const ticket = tickets.find(t => t.id === ticketId)
            if (ticket) {
                await supabase.from('order_items').insert([{
                    order_id: order.id,
                    ticket_id: ticketId,
                    quantity: qty,
                    unit_price: ticket.price,
                    subtotal: ticket.price * qty
                }])
            }
        }

        router.push(`/checkout?order=${order.id}`)
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading match details...</div>

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{match?.home_team} vs {match?.away_team}</h1>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2"><Calendar className="w-5 h-5" />{new Date(match?.match_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                        <div className="flex items-center gap-2"><Clock className="w-5 h-5" />{match?.kickoff_time}</div>
                        <div className="flex items-center gap-2"><MapPin className="w-5 h-5" />{match?.stadium}, {match?.city}</div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Ticket Categories */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6">Available Tickets</h2>
                        <div className="space-y-4">
                            {tickets.map(ticket => (
                                <div key={ticket.id} className="bg-white rounded-lg shadow-md p-6 flex flex-wrap justify-between items-center">
                                    <div><h3 className="text-xl font-semibold">{ticket.category}</h3><p className="text-gray-600">Section {ticket.section}</p><p className="text-sm text-green-600 mt-1">{ticket.quantity_available} tickets available</p></div>
                                    <div className="text-right"><div className="text-3xl font-bold text-blue-600">${ticket.price}</div><button onClick={() => addToCart(ticket.id)} className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Add to Cart</button></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-4">Your Cart</h3>
                            {Object.keys(selectedTickets).length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No tickets selected</p>
                            ) : (
                                <>
                                    <div className="space-y-3 mb-4">
                                        {Object.entries(selectedTickets).map(([ticketId, qty]) => {
                                            const ticket = tickets.find(t => t.id === ticketId)
                                            if (!ticket) return null
                                            return <div key={ticketId} className="flex justify-between text-sm"><span>{ticket.category} x{qty}</span><span>${ticket.price * qty}</span></div>
                                        })}
                                    </div>
                                    <div className="border-t pt-4 mb-6"><div className="flex justify-between font-bold text-lg"><span>Total</span><span>${getCartTotal()}</span></div></div>
                                    <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"><CreditCard className="w-5 h-5" /> Proceed to Checkout</button>
                                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500"><Shield className="w-4 h-4" /> Secure checkout</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
