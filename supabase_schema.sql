-- ===============================================================
-- AKHIL FOODS - SUPABASE POSTGRESQL SCHEMA
-- Artisanal Handcrafted Mushroom Pickles Store
-- Village Nandsiya, Moth, Jhansi, Uttar Pradesh - 284303
-- ===============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products Table (id, name, flavour, description, ingredients, shelf_life, image_url, sizes with prices, stock)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  flavour TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] DEFAULT '{}',
  shelf_life TEXT,
  image_url TEXT NOT NULL,
  image TEXT,
  sizes JSONB NOT NULL,
  stock INT DEFAULT 100,
  stock_count INT DEFAULT 100,
  rating NUMERIC(2,1) DEFAULT 0.0,
  reviews_count INT DEFAULT 0,
  gallery TEXT[] DEFAULT '{}',
  spice_level TEXT DEFAULT 'Medium',
  is_featured BOOLEAN DEFAULT true,
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  landmark TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  shipping NUMERIC NOT NULL,
  discount NUMERIC DEFAULT 0,
  coupon_code TEXT,
  total NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'Pending',
  order_status TEXT NOT NULL DEFAULT 'New',
  tracking_number TEXT,
  courier_name TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. Policies
-- Public can read products
DROP POLICY IF EXISTS "Public products read access" ON public.products;
CREATE POLICY "Public products read access" ON public.products
  FOR SELECT USING (true);

-- Public can insert orders
DROP POLICY IF EXISTS "Public orders insert access" ON public.orders;
CREATE POLICY "Public orders insert access" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Authenticated / public can read orders
DROP POLICY IF EXISTS "Orders read access" ON public.orders;
CREATE POLICY "Orders read access" ON public.orders
  FOR SELECT USING (true);

-- Allow order status updates
DROP POLICY IF EXISTS "Orders update access" ON public.orders;
CREATE POLICY "Orders update access" ON public.orders
  FOR UPDATE USING (true);

-- 6. Seed Real Signature Product: Mushroom Mela Oyster Mushroom Pickle (400g)
INSERT INTO public.products (
  id, name, slug, subtitle, flavour, description, ingredients, shelf_life, image_url, image, sizes, stock, stock_count, rating, reviews_count, gallery, spice_level, is_featured, badges
)
VALUES
(
  'prod-mushroom-mela',
  'Mushroom Mela Oyster Mushroom Pickle',
  'mushroom-mela-oyster-mushroom-pickle',
  'Artisanal handcrafted oyster mushroom pickle in pure mustard oil & spices',
  'Oyster Mushroom',
  'Authentic handcrafted oyster mushroom pickle by AKHIL FOODS, prepared in Village Nandsiya, Moth, Jhansi, Uttar Pradesh. Made with tender oyster mushrooms steeped in pure mustard oil, vinegar, and traditional stone-ground Indian spices for a rich, delicious taste.',
  ARRAY[
    'Mushroom',
    'Mustard Oil',
    'Vinegar',
    'Salt',
    'Red Chilli',
    'Coriander',
    'Mustard',
    'Fennel',
    'Fenugreek',
    'Cumin',
    'Turmeric',
    'Ajwain',
    'Ginger',
    'Garlic',
    'Permitted Additives'
  ],
  'Store in a cool, dry place, keep away from direct sunlight, use a clean dry spoon.',
  '/images/products/mushroom-mela-front.jpg',
  '/images/products/mushroom-mela-front.jpg',
  '[{"size": "400g", "price": 399, "originalPrice": 399, "inStock": true}]'::jsonb,
  100,
  100,
  0.0,
  0,
  ARRAY[
    '/images/products/mushroom-mela-front.jpg',
    '/images/products/mushroom-mela-side.jpg',
    '/images/products/mushroom-mela-ingredients.jpg',
    '/images/products/mushroom-mela-back.jpg'
  ],
  'Medium',
  true,
  ARRAY['Artisanal', 'Oyster Mushroom', '400g Jar', 'FSSAI Registered']
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  shelf_life = EXCLUDED.shelf_life,
  image_url = EXCLUDED.image_url,
  image = EXCLUDED.image,
  sizes = EXCLUDED.sizes,
  stock = EXCLUDED.stock,
  stock_count = EXCLUDED.stock_count,
  gallery = EXCLUDED.gallery,
  badges = EXCLUDED.badges;
