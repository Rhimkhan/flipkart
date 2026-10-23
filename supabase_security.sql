-- ===============================================================
-- AKHIL FOODS - SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- Execute this script in your Supabase Dashboard -> SQL Editor
-- ===============================================================

-- 1. Enable Row Level Security (RLS) on both core tables
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders ENABLE ROW LEVEL SECURITY;

-- 2. Drop all existing / legacy permissive policies
DROP POLICY IF EXISTS "Public products read access" ON public.products;
DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Products readable by everyone" ON public.products;
DROP POLICY IF EXISTS "Service role product write" ON public.products;

DROP POLICY IF EXISTS "Public orders insert access" ON public.orders;
DROP POLICY IF EXISTS "Orders read access" ON public.orders;
DROP POLICY IF EXISTS "Orders update access" ON public.orders;
DROP POLICY IF EXISTS "Allow anon inserts" ON public.orders;
DROP POLICY IF EXISTS "Allow anon reads" ON public.orders;
DROP POLICY IF EXISTS "Orders access restricted" ON public.orders;

-- 3. PRODUCTS TABLE RLS:
-- Products are readable by everyone (anon visitors, authenticated users, and service role).
-- Products are writable ONLY by service role (service_role automatically bypasses RLS; no write policies are granted to anon or authenticated).
CREATE POLICY "Products readable by everyone"
  ON public.products
  FOR SELECT
  TO public
  USING (true);

-- Explicitly revoke write permissions from anon and public roles
REVOKE INSERT, UPDATE, DELETE ON TABLE public.products FROM anon, authenticated, public;
GRANT SELECT ON TABLE public.products TO anon, authenticated, public;

-- 4. ORDERS TABLE RLS:
-- Orders are NOT readable or writable by the anon role at all.
-- Only the service_role (via Next.js server API routes using SUPABASE_SERVICE_ROLE_KEY) can read or write orders.
-- In PostgreSQL, enabling RLS with no policies granted to a role denies all operations by default.
REVOKE ALL ON TABLE public.orders FROM anon;
REVOKE ALL ON TABLE public.orders FROM public;

-- 5. Status Verification Queries:
-- Confirm RLS is enabled (rowsecurity = true)
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('products', 'orders');

-- List all active RLS policies
SELECT schemaname, tablename, policyname, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename IN ('products', 'orders');
