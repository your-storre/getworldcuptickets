import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string
                    full_name: string
                    created_at: string
                }
            }
            matches: {
                Row: {
                    id: string
                    home_team: string
                    away_team: string
                    match_date: string
                    kickoff_time: string
                    stadium: string
                    city: string
                    stage: string
                    status: string
                }
            }
            tickets: {
                Row: {
                    id: string
                    match_id: string
                    category: string
                    price: number
                    quantity_available: number
                    section: string
                }
            }
            orders: {
                Row: {
                    id: string
                    user_id: string
                    order_number: string
                    total_amount: number
                    status: string
                    created_at: string
                }
            }
        }
    }
}