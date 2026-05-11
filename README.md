# 🧊 The Ice Guys — Premium Ice Delivery Website

A stunning, 3D-powered Next.js website for The Ice Guys bagged ice brand, featuring a rotating 3D ice cube, smoke animations, real-time order notifications, and a full admin dashboard.

---

## ✨ Features

- 🎡 **3D Rotating Ice Cube** — Three.js powered glass ice cube with smoke, sparkles, and floating particles
- 🛍️ **Product Showcase** — Bagged Ice (3kg) & Flavored Ice Cup (5 flavors)
- 📦 **Order Flow** — Multi-step order form with product selection, flavor picker, quantity control
- ⚡ **Real-time Notifications** — Admin gets instant alerts when a new order comes in (Supabase real-time)
- 📊 **Admin Dashboard** — Full order management with status updates (pending → confirmed → preparing → delivered)
- 🎨 **Ice Aesthetic** — Glassmorphism, frost effects, ice-blue palette, Playfair Display typography

---

## 🚀 Quick Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open the SQL Editor in your project dashboard
3. Paste and run the contents of `supabase-schema.sql`
4. Go to Settings → API and copy your Project URL and anon key

### 3. Configure environment variables
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — 3D ice cube hero, brand intro |
| `/products` | Product showcase — Bagged Ice & Flavored Cup |
| `/order` | Order flow — 3-step ordering process |
| `/admin` | Admin dashboard — real-time order management |

---

## 🗄️ Database Schema

### `orders` table
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Auto-generated primary key |
| `created_at` | Timestamp | Order creation time |
| `customer_name` | Text | Customer's full name |
| `customer_phone` | Text | Phone number for contact |
| `customer_address` | Text | Delivery address |
| `product_type` | Enum | `bagged_ice` or `flavored_cup` |
| `flavor` | Enum | `blueberry`, `strawberry`, `cherry`, `mint`, `cola` |
| `quantity` | Integer | Number of items ordered |
| `total_price` | Decimal | Total cost in EGP |
| `status` | Enum | `pending`, `confirmed`, `preparing`, `delivered`, `cancelled` |
| `notes` | Text | Optional special instructions |

---

## 💰 Pricing

| Product | Price |
|---------|-------|
| 3kg Bagged Ice Cubes | 50 EGP |
| Flavored Ice Cup | 25 EGP |

*(Prices can be updated in `/app/order/page.tsx` → `PRICES` constant)*

---

## 🎨 Customization

- **Colors**: Edit `tailwind.config.js` and `globals.css`
- **Prices**: Edit `PRICES` in `/app/order/page.tsx`
- **3D Cube**: Edit `/components/3d/IceBackground.tsx`
- **Logo**: Replace the text logo in `/components/layout/Navbar.tsx` with an `<Image>` component pointing to your logo file in `/public/`

---

## 📦 Tech Stack

- **Next.js 14** — App Router, Server Components
- **React Three Fiber** — 3D rendering
- **@react-three/drei** — Three.js helpers (MeshTransmissionMaterial, Sparkles, Float)
- **Framer Motion** — Page animations
- **Supabase** — PostgreSQL database + real-time subscriptions
- **Tailwind CSS** — Styling
- **react-hot-toast** — Toast notifications

---

## 🔔 Real-Time Notifications

The admin dashboard at `/admin` subscribes to Supabase real-time changes. Every time a customer places an order, the admin sees:
- A toast notification pop up instantly
- The order card appear at the top of the list
- The pending counter update automatically

No refresh needed — it's fully live! 🔴

---

## 📱 Deployment

Deploy to Vercel in one click:
1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add your environment variables in Vercel's dashboard
4. Deploy ✅
