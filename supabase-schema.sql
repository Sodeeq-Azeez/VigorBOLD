-- Run this in your Supabase SQL Editor to create the tables

-- Create an enum for order status
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled');

-- Create an enum for payment method
CREATE TYPE payment_method AS ENUM ('pay_on_delivery', 'flutterwave');

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Customer details
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  
  -- Shipping details
  state TEXT NOT NULL,
  address TEXT NOT NULL,
  
  -- Order details
  package_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  total_amount NUMERIC(10, 2) NOT NULL,
  
  -- Status and Payment
  status order_status DEFAULT 'pending',
  payment_method payment_method NOT NULL,
  payment_reference TEXT,
  is_paid BOOLEAN DEFAULT false
);

-- Set up Row Level Security (RLS)
-- We want anyone (anon) to be able to insert orders, but only authenticated admins to read them
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous users to insert orders" ON orders
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read/update all orders (for the admin dashboard)
CREATE POLICY "Allow authenticated users to read orders" ON orders
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update orders" ON orders
  FOR UPDATE 
  TO authenticated
  USING (true);
