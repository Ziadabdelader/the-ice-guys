# 🧊 Supabase Setup Guide for The Ice Guys

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or login
3. Click **"New Project"**
4. Fill in details:
   - Name: `the-ice-guys`
   - Database Password: (create and save it!)
   - Region: Choose closest to you
5. Wait ~2 minutes for project creation

---

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)
   - **service_role key** (another long string)

---

## Step 3: Create Database Tables

1. Go to **SQL Editor** (left sidebar in Supabase)
2. Click **"New Query"**
3. Copy the entire content from `supabase-schema.sql`
4. Paste it into the SQL editor
5. Click **"Run"** or press `Ctrl+Enter`
6. You should see: ✅ Success message

---

## Step 4: Configure Your App

1. In your project root, create a file named `.env.local`
2. Copy the content from `.env.local.example`
3. Replace with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Save the file

---

## Step 5: Test the Connection

Run your development server:

```bash
npm run dev
```

Then test by:
1. Going to http://localhost:3000/order
2. Fill out the order form
3. Submit an order
4. Check Supabase dashboard → **Table Editor** → **orders** table
5. You should see your order! 🎉

---

## Step 6: Enable Real-time (Optional)

For live order updates in the admin panel:

1. Go to **Database** → **Replication** in Supabase
2. Find the `orders` table
3. Toggle **"Enable Replication"** ON
4. Now your admin panel will update in real-time!

---

## Troubleshooting

### ❌ "Invalid API key" error
- Double-check you copied the correct keys
- Make sure there are no extra spaces
- Restart your dev server after adding `.env.local`

### ❌ "Row Level Security" error
- Make sure you ran the entire SQL schema
- Check that RLS policies were created

### ❌ Orders not showing up
- Go to Supabase → **Table Editor** → **orders**
- Check if data is there
- If yes, it's a frontend issue
- If no, check your form submission

---

## Next Steps

Once connected, you can:
- ✅ Place orders from `/order` page
- ✅ View orders in `/admin` page
- ✅ Update order status
- ✅ See real-time updates

Need help? Check the console for error messages!
