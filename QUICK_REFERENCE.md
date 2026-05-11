# 🚀 Quick Reference Card

## Start Development
```bash
npm run dev
```
Open: http://localhost:3000

---

## Test Mobile
1. Press `F12` in browser
2. Press `Ctrl+Shift+M` (toggle device mode)
3. Select "iPhone 12 Pro"
4. Test all pages!

---

## Pages
- `/` - Homepage
- `/products` - Products page
- `/order` - Order form
- `/admin` - Admin dashboard

---

## What Changed

### ⚡ Performance
- Removed heavy 3D ice cube
- Added light smoke animation
- Website is now fast!

### 📱 Mobile
- All pages work on phones
- Easy to tap everything
- Forms don't zoom
- Professional spacing

### 🗄️ Database
- Supabase ready
- See `QUICK_START.md`
- Just add API keys

---

## Files to Know

### Documentation
- `CHANGES_SUMMARY.md` - Everything that changed
- `MOBILE_OPTIMIZATION.md` - Mobile details
- `TEST_MOBILE.md` - How to test
- `QUICK_START.md` - Supabase setup
- `QUICK_REFERENCE.md` - This file!

### Code
- `components/3d/IceBackground.tsx` - New smoke effect
- `app/page.tsx` - Homepage
- `app/order/page.tsx` - Order form
- `app/admin/page.tsx` - Admin panel
- `.env.local` - Add Supabase keys here

---

## Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Test Supabase connection
node test-supabase-connection.js

# Install dependencies
npm install
```

---

## Supabase Quick Setup

1. Go to supabase.com
2. Create project
3. Get API keys (Settings → API)
4. Add to `.env.local`
5. Run SQL from `supabase-schema.sql`
6. Test: `node test-supabase-connection.js`

Done! ✅

---

## Mobile Testing Quick

**In Browser:**
- F12 → Ctrl+Shift+M → Select device

**On Real Phone:**
1. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac)
2. Go to: `http://YOUR_IP:3000` on phone
3. Must be on same WiFi!

---

## Need Help?

- **Performance issues?** Check `CHANGES_SUMMARY.md`
- **Mobile problems?** Check `MOBILE_OPTIMIZATION.md`
- **Testing?** Check `TEST_MOBILE.md`
- **Supabase?** Check `QUICK_START.md`

---

## ✅ Everything Works!

- ⚡ Fast performance
- 📱 Mobile responsive
- 🎨 Professional design
- 🗄️ Database ready
- ✨ Ready to launch!

**You're all set!** 🎉
