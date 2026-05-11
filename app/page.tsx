'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Snowflake, Package, Star } from 'lucide-react'

const SMOKE_BLOBS = [
  { w: 300, h: 300, left: '10%', bottom: '20%', delay: '0s', duration: '7s', opacity: 0.12 },
  { w: 500, h: 500, left: '40%', bottom: '5%', delay: '2s', duration: '10s', opacity: 0.08 },
  { w: 200, h: 200, left: '70%', bottom: '25%', delay: '4s', duration: '8s', opacity: 0.15 },
  { w: 400, h: 350, left: '25%', bottom: '15%', delay: '1s', duration: '9s', opacity: 0.06 },
]

const FEATURES = [
  { icon: Snowflake, label: 'Crystal Clear Ice', desc: 'Restaurant-grade purity' },
  { icon: Package, label: '3kg Bags', desc: 'Perfect for any occasion' },
  { icon: Star, label: '5 Flavors', desc: 'Blueberry, Strawberry & more' },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Smoke blobs at bottom */}
      {SMOKE_BLOBS.map((blob, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: blob.w,
            height: blob.h,
            left: blob.left,
            bottom: blob.bottom,
            background: 'radial-gradient(ellipse, rgba(168, 216, 240, 0.35) 0%, transparent 70%)',
            animation: `smoke ${blob.duration} ease-in-out infinite`,
            animationDelay: blob.delay,
            opacity: blob.opacity * 10,
            filter: 'blur(30px)',
          }}
        />
      ))}

      {/* Ambient glow behind cube */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-16 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 glass border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8"
        >
          <Snowflake size={12} className="text-ice-300 sm:w-3.5 sm:h-3.5" />
          <span className="font-body text-xs sm:text-sm text-ice-200 tracking-wide">Premium Quality Ice — Delivered Fresh</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-4 sm:mb-6 px-2"
        >
          Stay{' '}
          <span className="relative inline-block">
            <span
              className="relative z-10"
              style={{
                background: 'linear-gradient(135deg, #a8d8f0, #38bdf8, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ice Cold
            </span>
          </span>
          <br />
          <span className="text-white/90">Always</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-body text-ice-200/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
        >
          Premium bagged ice cubes and refreshing flavored iced cups — crafted for gatherings, events, and everyday moments that deserve to be cool.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-20 px-2"
        >
          <Link
            href="/products"
            className="btn-ice inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-body font-semibold text-white text-sm sm:text-base"
          >
            Explore Products
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </Link>

          <Link
            href="/order"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-body font-semibold text-ice-200 text-sm sm:text-base"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Order Now
          </Link>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="glass border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(168, 216, 240, 0.12)' }}>
                <f.icon size={16} className="text-ice-300 sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="text-left">
                <p className="font-body font-semibold text-white text-xs sm:text-sm">{f.label}</p>
                <p className="font-body text-ice-200/60 text-[10px] sm:text-xs">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-body text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </div>
  )
}
