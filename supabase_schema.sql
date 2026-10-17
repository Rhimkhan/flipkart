-- ===============================================================
-- AKHIL FOODS - SUPABASE POSTGRESQL SCHEMA
-- Artisanal Mushroom Pickles Store
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
  stock INT DEFAULT 50,
  stock_count INT DEFAULT 50,
  rating NUMERIC(2,1) DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  gallery TEXT[] DEFAULT '{}',
  spice_level TEXT DEFAULT 'Medium',
  is_featured BOOLEAN DEFAULT false,
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

-- 6. Seed 4 Sample Artisanal Mushroom Pickle Products
INSERT INTO public.products (
  id, name, slug, subtitle, flavour, description, ingredients, shelf_life, image_url, image, sizes, stock, stock_count, rating, reviews_count, gallery, spice_level, is_featured, badges
)
VALUES
(
  'prod-1',
  'Classic Masala Oyster Mushroom Pickle',
  'classic-masala-oyster-mushroom-pickle',
  'Aromatic blend of roasted fenugreek, mustard, fennel & slow-cooked mushrooms',
  'Classic Masala',
  'Our flagship culinary masterpiece. Hand-harvested organic oyster mushrooms, tenderly sun-steeped in raw cold-pressed mustard oil with heirloom ground spices, kalonji, yellow mustard, and fragrant Kashmiri spices. Aged in traditional porous clay vats (Mitti Handi) to preserve probiotic culture and deliver an unmatched rich, savory tang.',
  ARRAY[
    'Fresh Farm Oyster Mushrooms (Pleurotus ostreatus)',
    'Cold-Pressed Kacchi Ghani Mustard Oil',
    'Kalonji (Nigella Seeds)',
    'Yellow Mustard Seeds',
    'Methi Dana (Fenugreek)',
    'Himalayan Pink Rock Salt',
    'Heirloom Turmeric & Kashmiri Red Chilli',
    'Fresh Ginger & Raw Asafoetida (Hing)'
  ],
  '12 Months (Store in a cool, dry place. Keep submerged in mustard oil)',
  '/images/classic-masala.jpg',
  '/images/classic-masala.jpg',
  '[{"size": "250g", "price": 299, "originalPrice": 350, "inStock": true}, {"size": "500g", "price": 549, "originalPrice": 650, "inStock": true}, {"size": "1kg", "price": 999, "originalPrice": 1200, "inStock": true}]'::jsonb,
  65,
  65,
  4.9,
  148,
  ARRAY['/images/classic-masala.jpg', '/images/hero-pickle.jpg'],
  'Medium',
  true,
  ARRAY['Bestseller', 'Clay Aged', 'Zero Preservatives']
),
(
  'prod-2',
  'Slow-Roasted Garlic Shiitake Mushroom Pickle',
  'slow-roasted-garlic-shiitake-mushroom-pickle',
  'Intense umami shiitake bites paired with sweet caramelized golden garlic cloves',
  'Garlic',
  'A gourmet lover''s dream. Rich, umami-dense shiitake and button mushrooms slow-simmered with whole garlic cloves in pure golden mustard oil. The garlic softens to a sweet, buttery consistency that balances the deep earthy mushroom profile and the punch of freshly cracked peppercorn and wild celery seeds.',
  ARRAY[
    'Whole Shiitake & Fresh Button Mushrooms',
    'Peeled Desi Golden Garlic Cloves',
    'Pure Cold-Pressed Mustard Oil',
    'Coarsely Ground Black Pepper',
    'Ajwain & Wild Celery Seeds',
    'Himalayan Rock Salt',
    'Sun-Dried Coriander Seed Powder',
    'Natural Raw Apple Cider Vinegar (trace)'
  ],
  '12 Months (Ages gracefully with time in cool pantry)',
  '/images/garlic-shiitake.jpg',
  '/images/garlic-shiitake.jpg',
  '[{"size": "250g", "price": 349, "originalPrice": 420, "inStock": true}, {"size": "500g", "price": 629, "originalPrice": 750, "inStock": true}, {"size": "1kg", "price": 1149, "originalPrice": 1399, "inStock": true}]'::jsonb,
  42,
  42,
  4.95,
  112,
  ARRAY['/images/garlic-shiitake.jpg', '/images/hero-pickle.jpg'],
  'Medium',
  true,
  ARRAY['Chef''s Special', 'High Umami', '100% Natural']
),
(
  'prod-3',
  'Heritage Mustard Oil Button Mushroom Pickle',
  'heritage-mustard-oil-button-mushroom-pickle',
  'Old-world grandma recipe steeped in pungent wood-pressed mustard oil',
  'Mustard Oil',
  'Crafted strictly following ancestral North Indian pickle traditions. Crisp, juicy button mushrooms marinated in virgin wooden-expeller (Kacchi Ghani) mustard oil, crushed yellow mustard seeds, raw mango pulp for tartness, and roasted cumin. Fermented in glazed ceramic barnis under the natural morning sun for 21 days.',
  ARRAY[
    'Select Plump White Button Mushrooms',
    'First-Press Cold-Pressed Mustard Oil',
    'Rai (Crushed Yellow Mustard)',
    'Raw Green Mango Essence',
    'Dry Mango Powder (Amchur)',
    'Roasted Jeera & Saunf (Fennel)',
    'Sendha Namak (Rock Salt)',
    'Pure Turmeric Powder'
  ],
  '12 Months (Sun-fermented for maximum shelf stability)',
  '/images/mustard-oil.jpg',
  '/images/mustard-oil.jpg',
  '[{"size": "250g", "price": 289, "originalPrice": 340, "inStock": true}, {"size": "500g", "price": 529, "originalPrice": 620, "inStock": true}, {"size": "1kg", "price": 979, "originalPrice": 1180, "inStock": true}]'::jsonb,
  50,
  50,
  4.88,
  89,
  ARRAY['/images/mustard-oil.jpg', '/images/hero-pickle.jpg'],
  'Mild',
  true,
  ARRAY['Traditional Recipe', 'Sun Cured', 'Probiotic Rich']
),
(
  'prod-4',
  'Spicy Red Chilli Pahadi Mushroom Pickle',
  'spicy-red-chilli-pahadi-mushroom-pickle',
  'Fiery Himalayan red chillies, crushed peppercorns & zesty wild spices',
  'Spicy Red Chilli',
  'For the brave palate seeking real heat and authentic mountain flavor. Farm-grown mushrooms infused with whole hand-pounded mountain red chillies, timur (Himalayan Sichuan pepper), and roasted coriander seeds. It kicks with upfront fire followed by an extraordinary savoury mushroom richness that elevates any meal.',
  ARRAY[
    'Wild & Farm Harvested Mushrooms',
    'Smoked Himalayan Red Chillies',
    'Timur (Pahadi Pepper Berry)',
    'Pure Cold-Pressed Mustard Oil',
    'Crushed Mustard & Nigella Seeds',
    'Himalayan Black Salt & Pink Salt',
    'Dried Ginger Flakes (Sonth)',
    'Fresh Lemon Juice Extract'
  ],
  '12 Months (Store in airtight jar)',
  '/images/spicy-chilli.jpg',
  '/images/spicy-chilli.jpg',
  '[{"size": "250g", "price": 319, "originalPrice": 380, "inStock": true}, {"size": "500g", "price": 579, "originalPrice": 690, "inStock": true}, {"size": "1kg", "price": 1049, "originalPrice": 1250, "inStock": true}]'::jsonb,
  38,
  38,
  4.92,
  96,
  ARRAY['/images/spicy-chilli.jpg', '/images/hero-pickle.jpg'],
  'Hot',
  true,
  ARRAY['Fiery Punch', 'Mountain Spices', '100% Handcrafted']
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  flavour = EXCLUDED.flavour,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  shelf_life = EXCLUDED.shelf_life,
  image_url = EXCLUDED.image_url,
  sizes = EXCLUDED.sizes,
  stock = EXCLUDED.stock;
