import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { customer_name, customer_phone, customer_address, product_type, flavor, quantity, total_price, notes } = body

    if (!customer_name || !customer_phone || !customer_address || !product_type || !quantity || !total_price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['bagged_ice', 'flavored_cup'].includes(product_type)) {
      return NextResponse.json({ error: 'Invalid product type' }, { status: 400 })
    }

    if (product_type === 'flavored_cup' && !flavor) {
      return NextResponse.json({ error: 'Flavor required for flavored cup' }, { status: 400 })
    }

    const { data, error } = await supabase.from('orders').insert({
      customer_name,
      customer_phone,
      customer_address,
      product_type,
      flavor: flavor || null,
      quantity: Number(quantity),
      total_price: Number(total_price),
      notes: notes || null,
    }).select().single()

    if (error) throw error

    return NextResponse.json({ success: true, order: data }, { status: 201 })
  } catch (err: any) {
    console.error('Order creation error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(limit)

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ orders: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
