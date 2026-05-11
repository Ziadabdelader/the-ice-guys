'use client'

import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

// Lazy load 3D background for better initial page load
const IceBackground = dynamic(() => import('@/components/3d/IceBackground'), {
  ssr: false,
  loading: () => null,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPage = pathname === '/admin'

  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        <title>The Ice Guys — Premium Bagged Ice Cubes</title>
        <meta name="description" content="Premium bagged ice cubes and flavored iced cups delivered to your door. Crystal clear, restaurant-grade ice for every occasion." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="noise-overlay bg-[#020d1a] min-h-screen">
        {/* Full-screen 3D ice cube background - lazy loaded (not on admin page) */}
        {!isAdminPage && <IceBackground />}
        
        {/* Navigation - hidden on admin page */}
        {!isAdminPage && <Navbar />}
        
        {/* Page content */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(13, 27, 62, 0.9)',
              color: '#e8f4fd',
              border: '1px solid rgba(168, 216, 240, 0.3)',
              backdropFilter: 'blur(20px)',
              fontFamily: 'var(--font-body)',
            },
            success: {
              iconTheme: { primary: '#38bdf8', secondary: '#020d1a' },
            },
            error: {
              iconTheme: { primary: '#f87171', secondary: '#020d1a' },
            },
          }}
        />
      </body>
    </html>
  )
}
