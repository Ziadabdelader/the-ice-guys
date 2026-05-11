'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/order', label: 'Order Now' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden glass border border-white/20 flex items-center justify-center group-hover:border-ice-300/50 transition-all">
              {/* Logo text fallback */}
              <span className="font-display font-black text-xs text-ice-200 text-center leading-tight px-1">THE ICE GUYS</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-white text-lg leading-tight">The Ice Guys</p>
              <p className="text-ice-300 text-xs font-body tracking-widest uppercase">Bagged Ice Cubes</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 rounded-xl font-body font-medium text-sm transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-ice-200/70 hover:text-white'
                }`}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 glass rounded-xl border border-white/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/order"
              className="btn-ice hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-semibold text-sm text-white"
            >
              <ShoppingBag size={16} />
              Order Now
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden glass border border-white/20 p-2.5 rounded-xl text-ice-200"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[70px] left-4 right-4 z-40 glass-strong rounded-2xl border border-white/15 p-5"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center py-3.5 px-4 rounded-xl font-body font-medium text-base mb-1 transition-all ${
                    pathname === link.href
                      ? 'glass text-white border border-white/20'
                      : 'text-ice-200/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
