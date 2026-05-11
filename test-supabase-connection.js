// Quick test script to verify Supabase connection
// Run with: node test-supabase-connection.js

require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🧊 Testing Supabase Connection...\n')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials!')
  console.error('Please add your keys to .env.local file\n')
  process.exit(1)
}

if (supabaseUrl.includes('your_supabase') || supabaseKey.includes('your_supabase')) {
  console.error('❌ Error: You need to replace the placeholder values!')
  console.error('Go to Supabase Dashboard → Settings → API to get your keys\n')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // Test 1: Check if we can connect
    console.log('✓ Supabase URL configured:', supabaseUrl)
    console.log('✓ API Key configured (first 20 chars):', supabaseKey.substring(0, 20) + '...\n')

    // Test 2: Try to query the orders table
    console.log('Testing database connection...')
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1)

    if (error) {
      console.error('❌ Database Error:', error.message)
      console.error('\nPossible issues:')
      console.error('1. Did you run the SQL schema in Supabase SQL Editor?')
      console.error('2. Check if the "orders" table exists in Table Editor')
      console.error('3. Verify your API keys are correct\n')
      process.exit(1)
    }

    console.log('✅ SUCCESS! Connected to Supabase!')
    console.log(`✅ Orders table exists (found ${data?.length || 0} orders)\n`)
    
    if (data && data.length > 0) {
      console.log('Sample order:', JSON.stringify(data[0], null, 2))
    } else {
      console.log('💡 Tip: No orders yet. Try placing one from http://localhost:3000/order')
    }

    console.log('\n🎉 Your app is ready to use Supabase!')
    
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
    process.exit(1)
  }
}

testConnection()
