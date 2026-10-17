# 🏺 AKHIL FOODS — Artisanal Mushroom Pickles Store

> **Good Food, Better Life.** Handcrafted Himalayan Mushroom Pickles aged in traditional clay pots (*Mitti Handi*) with virgin cold-pressed mustard oil, whole spices, and zero chemical preservatives.

---

## 🎨 Color Palette & Design System (Cosmic Latte, Mocha Cream & Deep Burgundy)
- **Primary / Headings / Buttons:** Deep Burgundy `#4E111B` / `#34080F` (royal, grounded, rich gourmet wine tone)
- **Background:** Cosmic Latte `#FFFBEF` (soft, luxurious, warm off-white canvas)
- **Accents & Highlights:** Mocha Cream `#E5D3C0` / `#D1B89F` (smooth, warm latte/cream tone for pills, badges, and meters)
- **Supporting Tones:**
  - Burgundy Rose: `#8C2D3C` (secondary badges and alerts)
  - Deep Espresso / Wine: `#28050B` / `#1F0E12` (dark luxury editorial sections & text)
- **Typography:**
  - Headings: `Playfair Display` (gourmet editorial serif)
  - Body: `Poppins` (clean, rounded, friendly sans-serif)

---

## ✨ Features Built & Tested

1. **Brand Identity & Logo:**
   - Official **AKHIL FOODS** emblem integrated across the navbar, footer, admin portal, and order receipts.
2. **Interactive Storefront (`/shop`):**
   - 4 Seed Products:
     1. *Classic Masala Oyster Mushroom Pickle*
     2. *Slow-Roasted Garlic Shiitake Mushroom Pickle*
     3. *Heritage Mustard Oil Button Mushroom Pickle*
     4. *Spicy Red Chilli Pahadi Mushroom Pickle*
   - Interactive jar size selector (`250g` / `500g` / `1kg`) with live price recalculation.
   - Flavour category filters & sorting by price/rating.
3. **Cart & Slide-in Drawer:**
   - Drawer slide-in animation powered by Framer Motion.
   - Persistent `localStorage` basket (survives page refreshes).
   - Dynamic Free Shipping Progress Meter (Free above ₹699).
   - Working coupon code discounts (`AKHIL10` for 10% off, `FREESHIP` for free delivery).
4. **Checkout & Payments (`/checkout`):**
   - Complete address form with Indian postal pincode validation.
   - Cash on Delivery (COD) and Razorpay test mode integration.
5. **Order Success & Tracking:**
   - Celebratory confetti on order placement.
   - Click-to-chat WhatsApp button with pre-filled order receipt details for instant dispatch confirmation.
   - Printable order invoice.
   - Live Order Tracking (`/track-order`) by Order ID or 10-digit mobile number with step-by-step progress pipeline.
6. **Password-Protected Admin Portal (`/admin`):**
   - Default Passkey: `akhiladmin2026`
   - Real-time revenue & order statistics.
   - Order Status updates (`New` → `Packed` → `Shipped` → `Delivered`).
   - Add Courier Name & AWB Tracking numbers.
   - Direct WhatsApp message customer button.
   - Live Price & Stock Editor for products + capability to add new varieties.
7. **Pincode Delivery Availability Checker:**
   - Instant verification of 19,000+ Indian postal codes with estimated delivery timelines.
8. **Floating WhatsApp Assistance:**
   - Floating quick-help button on every page with pre-filled greeting message.
9. **Story & Gallery Pages:**
   - Heritage Solan mushroom cultivation story (`/our-story`).
   - Full photography showcase modal (`/gallery`).
   - Contact form with interactive Google Map embed (`/contact`).
   - Comprehensive searchable FAQ with shelf-life guide (`/faq`).

---

## 🚀 Running Locally

```bash
# 1. Clone repository & install dependencies
npm install

# 2. Start Next.js development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

---

## 🗄️ Supabase Setup (Optional)
The website is architected with a dual persistence layer:
- **Out of the box:** Runs immediately with client-side & in-memory persistence without requiring external keys.
- **Production Supabase Integration:**
  1. Create a project at [supabase.com](https://supabase.com).
  2. Open the **SQL Editor** in your Supabase Dashboard.
  3. Copy and run the contents of [`supabase_schema.sql`](file:///c:/Users/rhim7/Downloads/project/flipkart/supabase_schema.sql).
  4. Paste your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` into `.env.local`.

---

## 💳 Razorpay Online Payments (Test Mode)
1. Sign up on [Razorpay](https://dashboard.razorpay.com).
2. Go to **Settings → API Keys** and generate Test Key ID & Secret.
3. Add `NEXT_PUBLIC_RAZORPAY_KEY_ID` to `.env.local`.

---

## 🌐 Deploy to Vercel
1. Push your repository to GitHub.
2. Import your repository into [Vercel](https://vercel.com).
3. Set your environment variables from `.env.example`.
4. Click **Deploy**!
