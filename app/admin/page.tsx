'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Package, CupSoda, Phone, MapPin, User, Clock, RefreshCw, Snowflake, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase, type Order, type OrderStatus } from '@/lib/supabase'

const STATUS_STEPS: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'delivered']
const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}
const STATUS_ICONS: Record<OrderStatus, string> = {
  pending: '⏳',
  confirmed: '✅',
  preparing: '🧊',
  delivered: '🚚',
  cancelled: '❌',
}

const FLAVOR_EMOJIS: Record<string, string> = {
  blueberry: '🫐',
  strawberry: '🍓',
  cherry: '🍒',
  mint: '🌿',
  cola: '🥤',
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function OrderCard({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: OrderStatus) => void }) {
  const [updating, setUpdating] = useState(false)

  async function handleStatusChange(newStatus: OrderStatus) {
    setUpdating(true)
    await onStatusChange(order.id, newStatus)
    setUpdating(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-white/20 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl glass border border-white/20 flex items-center justify-center text-base sm:text-lg flex-shrink-0">
            {order.product_type === 'bagged_ice' ? '🧊' : FLAVOR_EMOJIS[order.flavor || ''] || '🥤'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-body font-semibold text-white text-xs sm:text-sm truncate">
              {order.product_type === 'bagged_ice' ? '3kg Bagged Ice' : `${order.flavor ? order.flavor.charAt(0).toUpperCase() + order.flavor.slice(1) : ''} Cup`}
            </p>
            <p className="font-body text-[10px] sm:text-xs text-white/40">×{order.quantity} · {order.total_price} EGP</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-body font-semibold border status-${order.status} whitespace-nowrap`}>
            {STATUS_ICONS[order.status]} {STATUS_LABELS[order.status]}
          </span>
        </div>
      </div>

      {/* Customer info */}
      <div className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-white/10">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/60">
          <User size={10} className="flex-shrink-0 sm:w-[11px] sm:h-[11px]" />
          <span className="font-body truncate">{order.customer_name}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/60">
          <Phone size={10} className="flex-shrink-0 sm:w-[11px] sm:h-[11px]" />
          <span className="font-body">{order.customer_phone}</span>
        </div>
        <div className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/60">
          <MapPin size={10} className="mt-0.5 flex-shrink-0 sm:w-[11px] sm:h-[11px]" />
          <span className="font-body line-clamp-2">{order.customer_address}</span>
        </div>
        {order.notes && (
          <p className="text-[10px] sm:text-xs text-white/40 italic font-body pl-3 sm:pl-4 line-clamp-2">"{order.notes}"</p>
        )}
      </div>

      {/* Status controls */}
      {order.status !== 'cancelled' && order.status !== 'delivered' && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          {STATUS_STEPS.filter(s => s !== order.status).map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              disabled={updating}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-body font-medium border transition-all status-${s} hover:opacity-100 opacity-70`}
            >
              {updating ? '...' : `→ ${STATUS_LABELS[s]}`}
            </button>
          ))}
          <button
            onClick={() => handleStatusChange('cancelled')}
            disabled={updating}
            className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-body font-medium border status-cancelled opacity-70 hover:opacity-100 transition-all"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex items-center gap-1 text-white/25 text-[10px] sm:text-xs font-body">
        <Clock size={9} className="sm:w-[10px] sm:h-[10px]" />
        <span>{timeAgo(order.created_at)}</span>
      </div>
    </motion.div>
  )
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [newOrderCount, setNewOrderCount] = useState(0)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (!error && data) {
      setOrders(data as Order[])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchOrders()

    // Real-time subscription
    const channel = supabase
      .channel('orders-admin')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          const newOrder = payload.new as Order
          setOrders(prev => [newOrder, ...prev])
          setNewOrderCount(c => c + 1)

          // Audio + visual notification
          toast.custom((t) => (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="glass-strong border border-ice-300/30 rounded-2xl p-4 max-w-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ice-400/20 flex items-center justify-center text-xl">
                  🧊
                </div>
                <div>
                  <p className="font-body font-bold text-white text-sm">New Order! 🎉</p>
                  <p className="font-body text-xs text-ice-200/70">
                    {newOrder.customer_name} · {newOrder.total_price} EGP
                  </p>
                </div>
              </div>
            </motion.div>
          ), { duration: 6000 })
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          const updatedOrder = payload.new as Order
          setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o))
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [fetchOrders])

  async function handleStatusChange(id: string, status: OrderStatus) {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id)
    if (error) toast.error('Failed to update status')
    else toast.success(`Order marked as ${status}`)
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const pendingCount = orders.filter(o => o.status === 'pending').length

  const stats = [
    { label: 'Total', value: orders.length, color: 'text-white' },
    { label: 'Pending', value: pendingCount, color: 'text-yellow-400' },
    { label: 'Active', value: orders.filter(o => o.status === 'preparing' || o.status === 'confirmed').length, color: 'text-blue-400' },
    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'text-green-400' },
  ]

  return (
    <div className="min-h-screen pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <h1 className="font-display text-2xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
              {pendingCount > 0 && (
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center gap-1 sm:gap-1.5 bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-body font-bold"
                >
                  <Bell size={10} className="sm:w-[11px] sm:h-[11px]" />
                  {pendingCount} pending
                </motion.div>
              )}
            </div>
            <p className="font-body text-white/40 text-xs sm:text-sm">Real-time order management</p>
          </div>

          <button
            onClick={fetchOrders}
            className="glass border border-white/15 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-body text-xs sm:text-sm text-ice-200 flex items-center gap-2 hover:border-white/25 transition-all self-start"
          >
            <RefreshCw size={12} className={`${loading ? 'animate-spin' : ''} sm:w-3.5 sm:h-3.5`} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
              <p className={`font-display text-2xl sm:text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="font-body text-[10px] sm:text-xs text-white/40 mt-0.5 sm:mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {(['all', 'pending', 'confirmed', 'preparing', 'delivered', 'cancelled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-body text-xs sm:text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                filter === f
                  ? 'glass-strong border border-ice-300/30 text-white'
                  : 'glass border border-white/10 text-white/50 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All Orders' : STATUS_LABELS[f]}
              {f !== 'all' && (
                <span className="ml-1.5 sm:ml-2 opacity-60">({orders.filter(o => o.status === f).length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Orders grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16 sm:py-20">
            <div className="flex items-center gap-2 sm:gap-3 text-ice-200/50">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-ice-300/30 border-t-ice-300 rounded-full animate-spin" />
              <span className="font-body text-sm sm:text-base">Loading orders...</span>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🧊</div>
            <p className="font-display text-lg sm:text-xl text-white/50">No orders yet</p>
            <p className="font-body text-xs sm:text-sm text-white/30 mt-2">Orders will appear here in real-time</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <AnimatePresence>
              {filtered.map((order) => (
                <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
