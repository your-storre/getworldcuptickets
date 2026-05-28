'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Ticket, Calendar, Download, LogOut, User, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkUser()
        fetchOrders()
    }, [])

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) router.push('/login')
        setUser(user)
    }

    async function fetchOrders() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
            setOrders(data || [])
        }
        setLoading(false)
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        toast.success('Logged out successfully')
        router.push('/')
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8">
                    <div className="flex justify-between items-start">
                        <div><h1 className="text-3xl font-bold mb-2">Welcome back, {user?.user_metadata?.full_name || 'Fan'}!</h1><p className="text-blue-100">Manage your tickets and account settings</p></div>
                        <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition"><LogOut className="w-4 h-4" /> Logout</button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-gray-500 text-sm">Total Orders</p><p className="text-3xl font-bold">{orders.length}</p></div><Ticket className="w-12 h-12 text-blue-100" /></div></div>
                    <div className="bg-white rounded-xl p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-gray-500 text-sm">Total Spent</p><p className="text-3xl font-bold">${orders.reduce((sum, o) => sum + o.total_amount, 0)}</p></div><CreditCard className="w-12 h-12 text-green-100" /></div></div>
                    <div className="bg-white rounded-xl p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-gray-500 text-sm">Upcoming Matches</p><p className="text-3xl font-bold">{orders.filter(o => o.status === 'confirmed').length}</p></div><Calendar className="w-12 h-12 text-purple-100" /></div></div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b"><h2 className="text-xl font-bold">My Tickets & Orders</h2></div>
                    <div className="divide-y">
                        {orders.length === 0 ? (
                            <div className="text-center py-12"><Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">No orders yet</p></div>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className="p-6 flex flex-wrap justify-between items-center">
                                    <div><p className="font-semibold">Order #{order.order_number}</p><p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p></div>
                                    <div><span className={`px-3 py-1 rounded-full text-sm ${order.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span></div>
                                    <div className="text-right"><p className="font-bold text-lg">${order.total_amount}</p><button className="text-blue-600 text-sm flex items-center gap-1 mt-1"><Download className="w-4 h-4" /> Download Ticket</button></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
