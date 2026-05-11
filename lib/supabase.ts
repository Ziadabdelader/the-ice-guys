import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled'

export type FlavorType = 'blueberry' | 'strawberry' | 'cherry' | 'mint' | 'cola'

export type ProductType = 'bagged_ice' | 'flavored_cup'

export interface Order {
  id: string
  created_at: string
  customer_name: string
  customer_phone: string
  customer_address: string
  product_type: ProductType
  flavor?: FlavorType
  quantity: number
  total_price: number
  status: OrderStatus
  notes?: string
}

export interface OrderInsert {
  customer_name: string
  customer_phone: string
  customer_address: string
  product_type: ProductType
  flavor?: FlavorType
  quantity: number
  total_price: number
  notes?: string
}
