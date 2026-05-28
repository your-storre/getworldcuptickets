import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const createServerSupabaseClient = () => {
    return createServerComponentClient({ cookies })
}

export const requireAuth = async () => {
    const supabase = createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    return session
}

export const requireAdmin = async () => {
    const session = await requireAuth()
    const supabase = createServerSupabaseClient()

    const { data: user } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()

    if (user?.role !== 'admin') {
        redirect('/dashboard')
    }

    return session
}