# 🧊 The Ice Guys

> Premium bagged ice cubes and flavored iced cups delivery service

A modern, fast, and mobile-responsive Next.js web application for ordering ice products with real-time order management.

![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Ready-3ecf8e?style=flat-square&logo=supabase)

## ✨ Features

- 🎨 **Beautiful UI** - Modern glassmorphism design with ice-cold theme
- ⚡ **Fast Performance** - Optimized 3D background with smooth animations
- 📱 **Mobile Responsive** - Perfect experience on all devices (phones, tablets, desktop)
- 🛒 **Easy Ordering** - Simple 3-step order process
- 🗄️ **Real-time Database** - Supabase integration for instant updates
- 👨‍💼 **Admin Dashboard** - Manage orders with real-time status updates
- 🎭 **Smooth Animations** - Framer Motion for delightful interactions
- 🧊 **3D Effects** - Professional cold smoke animation using Three.js

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works!)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ziadabdelader/the-ice-guys.git
   cd the-ice-guys
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Go to your Supabase project
   - Open SQL Editor
   - Copy and run the SQL from `supabase-schema.sql`

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start ordering! 🎉

## 📁 Project Structure

```
the-ice-guys/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin dashboard
│   ├── api/                 # API routes
│   ├── order/               # Order page
│   ├── products/            # Products page
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── 3d/                  # 3D background components
│   └── layout/              # Layout components
├── lib/                     # Utility libraries
│   └── supabase.ts          # Supabase client
├── public/                  # Static assets
└── Documentation files      # Setup and testing guides
```

## 🎯 Pages

- **`/`** - Homepage with hero section and cold smoke animation
- **`/products`** - Product catalog (Bagged Ice & Flavored Cups)
- **`/order`** - 3-step order placement form
- **`/admin`** - Admin dashboard for order management

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Three.js & React Three Fiber** - 3D graphics

### Backend
- **Supabase** - Database and real-time subscriptions
- **Next.js API Routes** - Server-side endpoints

### UI/UX
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications
- **Glassmorphism** - Modern UI design

## 📱 Mobile Optimization

This app is fully optimized for mobile devices:

- ✅ Responsive design for all screen sizes (375px - 1920px+)
- ✅ Touch-friendly buttons (44px minimum tap targets)
- ✅ No zoom on input focus (16px font size)
- ✅ Smooth scrolling and animations
- ✅ Optimized 3D performance for mobile
- ✅ Mobile-first approach
- ✅ Tested on iPhone, Android, iPad

See `MOBILE_OPTIMIZATION.md` for complete details.

## 🗄️ Database Schema

Single table design for simplicity and performance:

```sql
orders
├── id (UUID, primary key)
├── created_at (timestamp)
├── customer_name (text)
├── customer_phone (text)
├── customer_address (text)
├── product_type (bagged_ice | flavored_cup)
├── flavor (blueberry | strawberry | cherry | mint | cola)
├── quantity (integer)
├── total_price (decimal)
├── status (pending | confirmed | preparing | delivered | cancelled)
├── notes (text, optional)
└── updated_at (timestamp, auto-updated)
```

## 💰 Pricing

| Product | Price |
|---------|-------|
| 3kg Bagged Ice Cubes | 50 EGP |
| Flavored Ice Cup (5 flavors) | 25 EGP |

*Prices can be updated in `app/order/page.tsx`*

## 🧪 Testing

### Test in Browser
```bash
# Start dev server
npm run dev

# Open DevTools (F12)
# Toggle device mode (Ctrl+Shift+M)
# Select device (iPhone, iPad, etc.)
```

### Test Supabase Connection
```bash
node test-supabase-connection.js
```

### Mobile Testing
See `TEST_MOBILE.md` for comprehensive mobile testing guide.

## 📚 Documentation

Complete documentation is included:

- **`QUICK_START.md`** - 5-minute Supabase setup guide
- **`SUPABASE_SETUP.md`** - Detailed database setup instructions
- **`MOBILE_OPTIMIZATION.md`** - Mobile optimization details
- **`TEST_MOBILE.md`** - Complete testing guide
- **`CHANGES_SUMMARY.md`** - Full changelog and improvements
- **`QUICK_REFERENCE.md`** - Quick command reference

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
6. Click "Deploy"
7. Done! ✅

Your site will be live at `https://your-project.vercel.app`

## 🎨 Customization

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --color-ice-primary: #a8d8f0;
  --color-ice-deep: #1a3a5c;
  /* ... */
}
```

### Change Products
Edit `app/products/page.tsx` - Update the `PRODUCTS` array

### Change Prices
Edit `app/order/page.tsx`:
```typescript
const PRICES: Record<ProductType, number> = {
  bagged_ice: 50,
  flavored_cup: 25,
}
```

### Customize 3D Background
Edit `components/3d/IceBackground.tsx` - Adjust particle count, colors, speed

## 🔔 Real-Time Features

The admin dashboard includes real-time updates:
- 🔴 **Live order notifications** - Toast alerts when new orders arrive
- 🔄 **Auto-refresh** - Order list updates automatically
- ⚡ **Instant status changes** - See updates across all admin sessions
- 📊 **Live statistics** - Order counts update in real-time

No page refresh needed!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Ziad Abdelader**
- GitHub: [@Ziadabdelader](https://github.com/Ziadabdelader)
- Repository: [the-ice-guys](https://github.com/Ziadabdelader/the-ice-guys)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Three.js for 3D graphics capabilities
- Tailwind CSS for the styling system
- Framer Motion for smooth animations

## 📞 Support

If you have any questions or need help:
1. Check the documentation files in the repository
2. Open an issue on GitHub
3. Read the `QUICK_START.md` for setup help

## 🎯 Performance

- ⚡ **Lighthouse Score:** 90+ on mobile
- 📱 **Mobile Optimized:** Works on all devices
- 🚀 **Fast Loading:** Optimized 3D rendering
- 💨 **Smooth Animations:** 60fps animations
- 🎨 **Professional Design:** Modern glassmorphism UI

---

**Made with ❄️ by The Ice Guys** | [Live Demo](https://the-ice-guys.vercel.app) (Deploy to see!)
