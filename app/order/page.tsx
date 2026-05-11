'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, CupSoda, Minus, Plus, User, Phone, MapPin, ChevronRight, ChevronLeft, CheckCircle, Snowflake } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase, type ProductType, type FlavorType } from '@/lib/supabase'

const FLAVORS = [
  { id: 'blueberry', label: 'Blueberry', emoji: '🫐', cls: 'flavor-blueberry' },
  { id: 'strawberry', label: 'Strawberry', emoji: '🍓', cls: 'flavor-strawberry' },
  { id: 'cherry', label: 'Cherry', emoji: '🍒', cls: 'flavor-cherry' },
  { id: 'mint', label: 'Mint', emoji: '🌿', cls: 'flavor-mint' },
  { id: 'cola', label: 'Cola', emoji: '🥤', cls: 'flavor-cola' },
]

const PRICES: Record<ProductType, number> = {
  bagged_ice: 50,
  flavored_cup: 25,
}

type Step = 'product' | 'details' | 'confirm' | 'success'

function OrderContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialProduct = (searchParams.get('product') as ProductType) || null

  const [step, setStep] = useState<Step>(initialProduct ? 'details' : 'product')
  const [loading, setLoading] = useState(false)

  // Order state
  const [product, setProduct] = useState<ProductType | null>(initialProduct)
  const [flavor, setFlavor] = useState<FlavorType | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  const totalPrice = product ? PRICES[product] * quantity : 0

  const canProceedToDetails =
    product !== null && (product === 'bagged_ice' || (product === 'flavored_cup' && flavor !== null))

  const canConfirm = name.trim() && phone.trim() && address.trim()

  async function placeOrder() {
    if (!product || !name || !phone || !address) return
    setLoading(true)

    try {
      const { error } = await supabase.from('orders').insert({
        customer_name: name,
        customer_phone: phone,
        customer_address: address,
        product_type: product,
        flavor: flavor ?? undefined,
        quantity,
        total_price: totalPrice,
        notes: notes || undefined,
      })

      if (error) throw error

      setStep('success')
      toast.success('Order placed successfully! 🧊')
    } catch (err: any) {
      toast.error(err.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const stepIndex = { product: 0, details: 1, confirm: 2, success: 3 }[step]

  return (
    <div className="min-h-screen pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 glass border border-white/15 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
            <Snowflake size={12} className="text-ice-300 sm:w-3.5 sm:h-3.5" />
            <span className="font-body text-xs sm:text-sm text-ice-200">Place an Order</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white">Order Ice</h1>
        </motion.div>

        {/* Step indicators */}
        {step !== 'success' && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 sm:mb-10 overflow-x-auto px-2">
            {['Product', 'Details', 'Confirm'].map((s, i) => (
              <div key={s} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-body font-bold transition-all ${
                  i < stepIndex ? 'bg-ice-400 text-navy' :
                  i === stepIndex ? 'bg-white/20 text-white border border-white/30' :
                  'bg-white/5 text-white/30'
                }`}>
                  {i < stepIndex ? '✓' : i + 1}
                </div>
                <span className={`font-body text-[10px] sm:text-xs ${i === stepIndex ? 'text-white' : 'text-white/30'}`}>{s}</span>
                {i < 2 && <div className="w-6 sm:w-8 h-[1px] bg-white/15 mx-0.5 sm:mx-1" />}
              </div>
            ))}
          </div>
        )}

        {/* Step content */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Product selection */}
          {step === 'product' && (
            <motion.div
              key="product"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-xl sm:text-2xl text-white mb-4 sm:mb-6">What would you like?</h2>

              {/* Product options */}
              <div className="grid gap-3 sm:gap-4 mb-4 sm:mb-6">
                {([
                  { id: 'bagged_ice', label: '3kg Bagged Ice Cubes', price: 50, icon: Package, desc: 'Crystal clear, restaurant-grade ice cubes' },
                  { id: 'flavored_cup', label: 'Flavored Ice Cup', price: 25, icon: CupSoda, desc: 'Choose from 5 delicious flavors' },
                ] as const).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setProduct(p.id); setFlavor(null) }}
                    className={`relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all text-left ${
                      product === p.id
                        ? 'glass-strong border-ice-300/40 shadow-[0_0_25px_rgba(168,216,240,0.15)]'
                        : 'glass border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                      product === p.id ? 'bg-ice-400/20' : 'bg-white/5'
                    }`}>
                      <p.icon size={20} className={`${product === p.id ? 'text-ice-300' : 'text-white/50'} sm:w-6 sm:h-6`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-white text-sm sm:text-base">{p.label}</p>
                      <p className="font-body text-xs sm:text-sm text-white/50 truncate">{p.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display font-bold text-lg sm:text-xl text-white">{p.price}</p>
                      <p className="font-body text-[10px] sm:text-xs text-white/40">EGP</p>
                    </div>
                    {product === p.id && (
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-ice-400 flex items-center justify-center">
                        <CheckCircle size={10} className="text-navy sm:w-3 sm:h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Flavor selection */}
              <AnimatePresence>
                {product === 'flavored_cup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 sm:mb-6"
                  >
                    <h3 className="font-body font-semibold text-ice-200 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-widest">Choose your flavor</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {FLAVORS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setFlavor(f.id as FlavorType)}
                          className={`${f.cls} relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-body font-semibold text-white text-xs sm:text-sm transition-all ${
                            flavor === f.id ? 'ring-2 ring-white/50 scale-105' : 'opacity-70 hover:opacity-100 hover:scale-102'
                          }`}
                        >
                          <span className="text-base sm:text-xl">{f.emoji}</span>
                          <span className="truncate">{f.label}</span>
                          {flavor === f.id && (
                            <CheckCircle size={12} className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 text-white/80 sm:w-3.5 sm:h-3.5" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quantity */}
              {product && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body font-semibold text-white text-sm sm:text-base">Quantity</p>
                      <p className="font-body text-xs sm:text-sm text-white/40">How many would you like?</p>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl glass border border-white/20 flex items-center justify-center text-white hover:border-ice-300/40 transition-all active:scale-95"
                      >
                        <Minus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                      <span className="font-display text-xl sm:text-2xl font-bold text-white w-6 sm:w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl glass border border-white/20 flex items-center justify-center text-white hover:border-ice-300/40 transition-all active:scale-95"
                      >
                        <Plus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                onClick={() => setStep('details')}
                disabled={!canProceedToDetails}
                className={`w-full btn-ice flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-body font-semibold text-white text-sm sm:text-base transition-all ${
                  !canProceedToDetails ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                Continue <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: Customer details */}
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-xl sm:text-2xl text-white mb-4 sm:mb-6">Your Details</h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {[
                  { id: 'name', label: 'Full Name', icon: User, value: name, setter: setName, placeholder: 'Ahmed Hassan', type: 'text' },
                  { id: 'phone', label: 'Phone Number', icon: Phone, value: phone, setter: setPhone, placeholder: '+20 1XX XXX XXXX', type: 'tel' },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="font-body text-xs sm:text-sm text-ice-200/70 mb-1.5 sm:mb-2 flex items-center gap-2">
                      <field.icon size={12} className="sm:w-3.5 sm:h-3.5" />
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full glass border border-white/15 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 font-body text-white placeholder-white/25 text-sm focus:outline-none focus:border-ice-300/40 transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="font-body text-xs sm:text-sm text-ice-200/70 mb-1.5 sm:mb-2 flex items-center gap-2">
                    <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                    Delivery Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Tahrir St, Cairo..."
                    rows={3}
                    className="w-full glass border border-white/15 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 font-body text-white placeholder-white/25 text-sm focus:outline-none focus:border-ice-300/40 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="font-body text-xs sm:text-sm text-ice-200/70 mb-1.5 sm:mb-2 block">Notes (optional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions..."
                    className="w-full glass border border-white/15 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 font-body text-white placeholder-white/25 text-sm focus:outline-none focus:border-ice-300/40 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setStep('product')}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-body font-semibold text-ice-200 text-sm sm:text-base glass border border-white/10 hover:border-white/20 transition-all"
                >
                  <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Back
                </button>
                <button
                  onClick={() => setStep('confirm')}
                  disabled={!canConfirm}
                  className={`flex-1 btn-ice flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-body font-semibold text-white text-sm sm:text-base ${!canConfirm ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  Review Order <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Confirm */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-xl sm:text-2xl text-white mb-4 sm:mb-6">Review & Confirm</h2>

              <div className="glass border border-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between pb-3 sm:pb-4 border-b border-white/10">
                  <div>
                    <p className="font-body font-semibold text-white text-sm sm:text-base">
                      {product === 'bagged_ice' ? '3kg Bagged Ice Cubes' : 'Flavored Ice Cup'}
                    </p>
                    {flavor && (
                      <p className="font-body text-xs sm:text-sm text-ice-200/60 capitalize">{flavor} flavor</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-body text-xs sm:text-sm text-white/50">x{quantity}</p>
                    <p className="font-display font-bold text-white text-sm sm:text-base">{totalPrice} EGP</p>
                  </div>
                </div>

                {[
                  { label: 'Name', value: name, icon: User },
                  { label: 'Phone', value: phone, icon: Phone },
                  { label: 'Address', value: address, icon: MapPin },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2 sm:gap-3">
                    <item.icon size={12} className="text-ice-300/60 mt-0.5 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-[10px] sm:text-xs text-white/40 uppercase tracking-wide">{item.label}</p>
                      <p className="font-body text-xs sm:text-sm text-white break-words">{item.value}</p>
                    </div>
                  </div>
                ))}

                {notes && (
                  <p className="font-body text-xs sm:text-sm text-white/50 italic">Note: {notes}</p>
                )}

                <div className="pt-3 sm:pt-4 border-t border-white/10 flex justify-between items-center">
                  <p className="font-body font-semibold text-ice-200 text-sm sm:text-base">Total</p>
                  <p className="font-display text-xl sm:text-2xl font-black text-white">{totalPrice} EGP</p>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-body font-semibold text-ice-200 text-sm sm:text-base glass border border-white/10 hover:border-white/20 transition-all"
                >
                  <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Back
                </button>
                <button
                  onClick={placeOrder}
                  disabled={loading}
                  className="flex-1 btn-ice flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-body font-semibold text-white text-sm sm:text-base animate-pulse-glow"
                >
                  {loading ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Place Order <Snowflake size={16} className="sm:w-[18px] sm:h-[18px]" /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Success */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8 sm:py-10 px-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-6xl sm:text-7xl mb-4 sm:mb-6"
              >
                🧊
              </motion.div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-2 sm:mb-3">Order Placed!</h2>
              <p className="font-body text-ice-200/60 text-base sm:text-lg mb-1 sm:mb-2">
                Thank you, {name}!
              </p>
              <p className="font-body text-white/40 text-xs sm:text-sm mb-8 sm:mb-10">
                We'll contact you at {phone} shortly.
              </p>

              <div className="glass border border-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-left">
                <p className="font-body text-xs sm:text-sm text-ice-200/60 mb-1">Your order</p>
                <p className="font-body font-semibold text-white text-sm sm:text-base">
                  {quantity}× {product === 'bagged_ice' ? '3kg Bagged Ice' : `Flavored Cup (${flavor})`}
                </p>
                <p className="font-display text-xl sm:text-2xl font-bold text-ice-300 mt-2">{totalPrice} EGP</p>
              </div>

              <button
                onClick={() => router.push('/')}
                className="btn-ice inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-body font-semibold text-white text-sm sm:text-base"
              >
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 flex items-center justify-center text-white">Loading...</div>}>
      <OrderContent />
    </Suspense>
  )
}
