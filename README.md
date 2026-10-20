# 🏺 AKHIL FOODS — Artisanal Mushroom Pickles Store

> **Great Food, Better Life.** Handcrafted Artisanal Oyster Mushroom Pickles made with pure mustard oil, whole stone-ground spices, and zero chemical shortcuts. Prepared in Village Nandsiya, Moth, Jhansi, Uttar Pradesh.

---

## 🎨 Brand Identity & Theme
- **Brand:** AKHIL FOODS
- **Tagline:** Great Food, Better Life
- **Location:** Village Nandsiya, Karguwan Road, Near Ambedkar Murti, Moth, Jhansi, Uttar Pradesh - 284303
- **FSSAI Lic. No.:** 22726293000001
- **GSTIN:** 09FTOPD3011E1ZZ
- **Udyam Reg. No.:** UDYAM-UP-39-0059446
- **WhatsApp / Phone:** 916386423865 (+91 63864 23865)

---

## ✨ Features Built & Tested

1. **Brand Identity & Certificates (`/certificates`):**
   - Official **AKHIL FOODS** emblem integrated across the navbar, footer, admin portal, and order receipts.
   - Dedicated Licenses & Certifications page showcasing FSSAI (with PDF view button), GST, and Udyam details.

2. **Interactive Storefront (`/shop`):**
   - Signature Product: *Mushroom Mela Oyster Mushroom Pickle* (400g glass jar, MRP ₹399).
   - High-resolution multi-angle jar photography (front, side, ingredients label, back instructions).
   - Live ingredients breakdown, storage instructions, and "Be the first to review" community state.

3. **Cart & Slide-in Drawer:**
   - Drawer slide-in animation powered by Framer Motion.
   - Persistent `localStorage` basket (survives page refreshes).
   - Dynamic Free Shipping Progress Meter (Free above ₹699).
   - Working coupon code discounts (`AKHIL10` for 10% off, `FREESHIP` for free delivery).

4. **Checkout & Payments (`/checkout`):**
   - Complete address form with Indian postal pincode validation.
   - Cash on Delivery (COD) and Razorpay test mode integration with cryptographic HMAC verification.
   - Prominent FSSAI and legal business address trust lines near checkout.

5. **Order Success & Tracking:**
   - Celebratory confetti on order placement.
   - Click-to-chat WhatsApp button with pre-filled order receipt details for instant dispatch confirmation.
   - Printable order invoice.
   - Live Order Tracking (`/track-order`) by Order ID or 10-digit mobile number with step-by-step progress pipeline.

6. **Password-Protected Admin Portal (`/admin`):**
   - Secure staff passkey configured via `ADMIN_PASSWORD` in `.env.local`.
   - Real-time revenue & order statistics.
   - Order Status updates (`New` → `Packed` → `Shipped` → `Delivered`).
   - Add Courier Name & AWB Tracking numbers.
   - Direct WhatsApp message customer button.

7. **Pincode Delivery Availability Checker:**
   - Instant verification of 19,000+ Indian postal codes with estimated delivery timelines.

8. **Story, Certificates, & Contact Pages:**
   - Authentic story rooted in Village Nandsiya, Moth, Jhansi (`/our-story`).
   - Direct view of FSSAI Food Safety Certificate PDF (`/certificates`).
   - Contact form with interactive Google Map embed centered on Nandsiya, Moth, Jhansi (`/contact`).
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
  3. Copy and run the contents of `supabase_schema.sql`.
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
