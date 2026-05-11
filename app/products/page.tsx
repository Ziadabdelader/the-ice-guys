'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, CupSoda, ArrowRight, Check, Snowflake } from 'lucide-react'

const FLAVORS = [
  { id: 'blueberry', label: 'Blueberry', color: '#7c3aed', bg: 'flavor-blueberry', emoji: '🫐' },
  { id: 'strawberry', label: 'Strawberry', color: '#e879a1', bg: 'flavor-strawberry', emoji: '🍓' },
  { id: 'cherry', label: 'Cherry', color: '#be185d', bg: 'flavor-cherry', emoji: '🍒' },
  { id: 'mint', label: 'Mint', color: '#34d399', bg: 'flavor-mint', emoji: '🌿' },
  { id: 'cola', label: 'Cola', color: '#a16207', bg: 'flavor-cola', emoji: '🥤' },
]

const PRODUCTS = [
  {
    id: 'bagged_ice',
    name: 'Bagged Ice Cubes',
    subtitle: '3kg Premium Bag',
    price: 50,
    currency: 'EGP',
    description: 'Crystal-clear, restaurant-grade ice cubes packed in a sealed 3kg bag. Perfect for parties, gatherings, coolers, and any occasion that demands perfectly chilled refreshment.',
    icon: Package,
    gradient: 'from-sky-400/20 to-blue-600/20',
    borderGlow: 'rgba(56, 189, 248, 0.35)',
    features: [
      '3 kilograms per bag',
      'Crystal clear purity',
      'Sealed & food-safe',
      'Slow-melt formula',
      'Restaurant grade',
    ],
    tag: 'Best Seller',
    tagColor: '#38bdf8',
  },
  {
    id: 'flavored_cup',
    name: 'Flavored Ice Cup',
    subtitle: '5 Amazing Flavors',
    price: 25,
    currency: 'EGP',
    description: 'Chilled ice cups infused with bold, vibrant flavors. Choose from our signature selection — a perfect refreshing treat for hot days and cool moments.',
    icon: CupSoda,
    gradient: 'from-purple-400/20 to-pink-600/20',
    borderGlow: 'rgba(168, 85, 247, 0.35)',
    features: [
      '5 signature flavors',
      'Refreshing & cold',
      'Made fresh daily',
      'No artificial colors',
      'Perfect for any weather',
    ],
    tag: 'Fan Favorite',
    tagColor: '#c084fc',
  },
]

function FlavorBadge({ flavor }: { flavor: typeof FLAVORS[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={`${flavor.bg} flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-white text-[10px] sm:text-xs font-body font-semibold shadow-lg`}
    >
      <span className="text-xs sm:text-sm">{flavor.emoji}</span>
      <span>{flavor.label}</span>
    </motion.div>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 glass border border-white/15 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
            <Snowflake size={12} className="text-ice-300 sm:w-3.5 sm:h-3.5" />
            <span className="font-body text-xs sm:text-sm text-ice-200">Our Products</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 sm:mb-4 px-2">
            Choose Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a8d8f0, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Cool
            </span>
          </h1>
          <p className="font-body text-ice-200/60 text-base sm:text-lg max-w-xl mx-auto px-4">
            Two premium products. One chilling experience.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative group"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
                style={{ background: product.borderGlow }}
              />

              <div
                className="relative glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full border transition-all duration-500"
                style={{
                  borderColor: `rgba(255,255,255,0.1)`,
                  background: `linear-gradient(135deg, ${product.gradient.replace('from-', '').replace('to-', '')})`,
                }}
              >
                {/* Tag */}
                <div
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-body font-bold"
                  style={{
                    background: `${product.tagColor}22`,
                    border: `1px solid ${product.tagColor}44`,
                    color: product.tagColor,
                  }}
                >
                  {product.tag}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl glass border border-white/20 flex items-center justify-center mb-4 sm:mb-6">
                  <product.icon size={24} className="text-ice-200 sm:w-7 sm:h-7" />
                </div>

                {/* Title */}
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{product.name}</h2>
                <p className="font-body text-ice-300/70 text-xs sm:text-sm mb-3 sm:mb-4 tracking-wide">{product.subtitle}</p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4 sm:mb-6">
                  <span className="font-display text-3xl sm:text-4xl font-black text-white">{product.price}</span>
                  <span className="font-body text-ice-200/60 text-xs sm:text-sm">{product.currency}</span>
                </div>

                <p className="font-body text-ice-200/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {product.description}
                </p>

                {/* Flavors (for flavored cup) */}
                {product.id === 'flavored_cup' && (
                  <div className="mb-4 sm:mb-6">
                    <p className="font-body text-[10px] sm:text-xs text-ice-200/50 uppercase tracking-widest mb-2 sm:mb-3">Available Flavors</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {FLAVORS.map((f) => <FlavorBadge key={f.id} flavor={f} />)}
                    </div>
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs sm:text-sm font-body text-ice-200/70">
                      <Check size={12} className="text-ice-400 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/order?product=${product.id}`}
                  className="btn-ice w-full flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-body font-semibold text-white text-xs sm:text-sm"
                >
                  Order {product.name}
                  <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="font-body text-ice-200/40 text-xs sm:text-sm mb-3 sm:mb-4">Not sure what to order?</p>
          <Link
            href="/order"
            className="inline-flex items-center gap-2 font-body text-ice-300 hover:text-white transition-colors text-xs sm:text-sm"
          >
            Order multiple items at once <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
