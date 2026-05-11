-- =============================================
-- THE ICE GUYS - Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('bagged_ice', 'flavored_cup')),
  flavor TEXT CHECK (flavor IN ('blueberry', 'strawberry', 'cherry', 'mint', 'cola')),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  total_price DECIMAL(10,2) NOT NULL CHECK (total_price > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'delivered', 'cancelled')),
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: anyone can insert (place an order)
CREATE POLICY "Anyone can place an order" ON orders
  FOR INSERT WITH CHECK (true);

-- Policy: anyone can read orders (you can restrict this later with auth)
CREATE POLICY "Anyone can view orders" ON orders
  FOR SELECT USING (true);

-- Policy: update orders (for admin status changes)
CREATE POLICY "Anyone can update order status" ON orders
  FOR UPDATE USING (true);

-- Enable real-time for orders table
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- Sample data (optional - for testing)
-- =============================================
-- INSERT INTO orders (customer_name, customer_phone, customer_address, product_type, flavor, quantity, total_price)
-- VALUES
--   ('Ahmed Hassan', '+201234567890', '123 Tahrir St, Cairo', 'bagged_ice', NULL, 2, 100.00),
--   ('Sara Mohamed', '+201098765432', '456 Nile Ave, Giza', 'flavored_cup', 'blueberry', 3, 75.00);
