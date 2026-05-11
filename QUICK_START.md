# 🚀 Quick Start - Connect to Supabase

## What You Need to Do (5 minutes):

### 1️⃣ Create Supabase Account
- Go to: https://supabase.com
- Click "Start your project" → Sign up
- Create new project (takes 2 minutes)

### 2️⃣ Get Your API Keys
In Supabase dashboard:
- Click **Settings** (⚙️ icon in sidebar)
- Click **API**
- Copy these 2 values:
  - `Project URL`
  - `anon public` key

### 3️⃣ Add Keys to Your App
Open the file `.env.local` in your project and replace:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...
```

### 4️⃣ Create Database Table
In Supabase dashboard:
- Click **SQL Editor** (left sidebar)
- Click **New Query**
- Open your `supabase-schema.sql` file
- Copy ALL the content
- Paste into SQL Editor
- Click **RUN** (or Ctrl+Enter)
- Wait for ✅ Success

### 5️⃣ Test Connection
In your terminal, run:

```bash
node test-supabase-connection.js
```

If you see ✅ SUCCESS - you're done!

### 6️⃣ Start Your App
```bash
npm run dev
```

Go to http://localhost:3000 and test placing an order!

---

## 📍 Where to Find Things:

| What | Where |
|------|-------|
| API Keys | Supabase → Settings → API |
| Database Tables | Supabase → Table Editor |
| SQL Editor | Supabase → SQL Editor (left sidebar) |
| View Orders | Supabase → Table Editor → orders |
| Your App | http://localhost:3000 |
| Place Order | http://localhost:3000/order |
| Admin Panel | http://localhost:3000/admin |

---

## ❓ Having Issues?

### "Invalid API key"
- Make sure you copied the FULL key (it's very long!)
- No extra spaces before/after
- Restart dev server: `Ctrl+C` then `npm run dev`

### "Table doesn't exist"
- Go to Supabase → SQL Editor
- Run the `supabase-schema.sql` again
- Check Table Editor to see if "orders" table appears

### Still stuck?
Run the test script to see detailed error:
```bash
node test-supabase-connection.js
```

---

## 🎉 What You Can Do After Setup:

✅ Place orders from your website
✅ View all orders in admin panel
✅ Update order status (pending → confirmed → delivered)
✅ Real-time updates (orders appear instantly)
✅ Store customer information securely

Need the detailed guide? Check `SUPABASE_SETUP.md`
