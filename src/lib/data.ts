import { Product, Review } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Classic Masala Oyster Mushroom Pickle",
    slug: "classic-masala-oyster-mushroom-pickle",
    subtitle: "Aromatic blend of roasted fenugreek, mustard, fennel & slow-cooked mushrooms",
    description:
      "Our flagship culinary masterpiece. Hand-harvested organic oyster mushrooms, tenderly sun-steeped in raw cold-pressed mustard oil with heirloom ground spices, kalonji, yellow mustard, and fragrant Kashmiri spices. Aged in traditional porous clay vats (Mitti Handi) to preserve probiotic culture and deliver an unmatched rich, savory tang.",
    flavour: "Classic Masala",
    rating: 4.9,
    reviewsCount: 148,
    image: "/images/classic-masala.jpg",
    gallery: ["/images/classic-masala.jpg", "/images/hero-pickle.jpg"],
    ingredients: [
      "Farm Fresh Oyster Mushrooms (Pleurotus ostreatus)",
      "Cold-Pressed Kacchi Ghani Mustard Oil",
      "Kalonji (Nigella Seeds)",
      "Yellow Mustard Seeds",
      "Methi Dana (Fenugreek)",
      "Himalayan Pink Rock Salt",
      "Heirloom Turmeric & Kashmiri Red Chilli",
      "Fresh Ginger & Raw Asafoetida (Hing)",
    ],
    shelfLife: "12 Months (Store in a cool, dry place. Always use a dry spoon)",
    spiceLevel: "Medium",
    isFeatured: true,
    stockCount: 65,
    sizes: [
      { size: "250g", price: 299, originalPrice: 350, inStock: true },
      { size: "500g", price: 549, originalPrice: 650, inStock: true },
      { size: "1kg", price: 999, originalPrice: 1200, inStock: true },
    ],
    badges: ["Bestseller", "Clay Aged", "Zero Preservatives"],
  },
  {
    id: "prod-2",
    name: "Slow-Roasted Garlic Shiitake Mushroom Pickle",
    slug: "slow-roasted-garlic-shiitake-mushroom-pickle",
    subtitle: "Intense umami shiitake bites paired with sweet caramelized golden garlic cloves",
    description:
      "A gourmet lover's dream. Rich, umami-dense shiitake and button mushrooms slow-simmered with whole garlic cloves in pure golden mustard oil. The garlic softens to a sweet, buttery consistency that balances the deep earthy mushroom profile and the punch of freshly cracked peppercorn and wild celery seeds.",
    flavour: "Garlic",
    rating: 4.95,
    reviewsCount: 112,
    image: "/images/garlic-shiitake.jpg",
    gallery: ["/images/garlic-shiitake.jpg", "/images/hero-pickle.jpg"],
    ingredients: [
      "Whole Shiitake & Fresh Button Mushrooms",
      "Peeled Desi Golden Garlic Cloves",
      "Pure Cold-Pressed Mustard Oil",
      "Coarsely Ground Black Pepper",
      "Ajwain & Wild Celery Seeds",
      "Himalayan Rock Salt",
      "Sun-Dried Coriander Seed Powder",
      "Natural Raw Apple Cider Vinegar (trace)",
    ],
    shelfLife: "12 Months (Ages gracefully with time)",
    spiceLevel: "Medium",
    isFeatured: true,
    stockCount: 42,
    sizes: [
      { size: "250g", price: 349, originalPrice: 420, inStock: true },
      { size: "500g", price: 629, originalPrice: 750, inStock: true },
      { size: "1kg", price: 1149, originalPrice: 1399, inStock: true },
    ],
    badges: ["Chef's Special", "High Umami", "100% Natural"],
  },
  {
    id: "prod-3",
    name: "Heritage Mustard Oil Button Mushroom Pickle",
    slug: "heritage-mustard-oil-button-mushroom-pickle",
    subtitle: "Old-world grandma recipe steeped in pungent wood-pressed mustard oil",
    description:
      "Crafted strictly following ancestral North Indian pickle traditions. Crisp, juicy button mushrooms marinated in virgin wooden-expeller (Kacchi Ghani) mustard oil, crushed yellow mustard seeds, raw mango pulp for tartness, and roasted cumin. Fermented in glazed ceramic barnis under the natural morning sun for 21 days.",
    flavour: "Mustard Oil",
    rating: 4.88,
    reviewsCount: 89,
    image: "/images/mustard-oil.jpg",
    gallery: ["/images/mustard-oil.jpg", "/images/hero-pickle.jpg"],
    ingredients: [
      "Select Plump White Button Mushrooms",
      "First-Press Cold-Pressed Mustard Oil",
      "Rai (Crushed Yellow Mustard)",
      "Raw Green Mango Essence",
      "Dry Mango Powder (Amchur)",
      "Roasted Jeera & Saunf (Fennel)",
      "Sendha Namak (Rock Salt)",
      "Pure Turmeric Powder",
    ],
    shelfLife: "12 Months (Sun-fermented for maximum shelf stability)",
    spiceLevel: "Mild",
    isFeatured: true,
    stockCount: 50,
    sizes: [
      { size: "250g", price: 289, originalPrice: 340, inStock: true },
      { size: "500g", price: 529, originalPrice: 620, inStock: true },
      { size: "1kg", price: 979, originalPrice: 1180, inStock: true },
    ],
    badges: ["Traditional Recipe", "Sun Cured", "Probiotic Rich"],
  },
  {
    id: "prod-4",
    name: "Spicy Red Chilli Pahadi Mushroom Pickle",
    slug: "spicy-red-chilli-pahadi-mushroom-pickle",
    subtitle: "Fiery Himalayan red chillies, crushed peppercorns & zesty wild spices",
    description:
      "For the brave palate seeking real heat and authentic mountain flavor. Farm-grown mushrooms infused with whole hand-pounded mountain red chillies, timur (Himalayan Sichuan pepper), and roasted coriander seeds. It kicks with upfront fire followed by an extraordinary savoury mushroom richness that elevates any meal.",
    flavour: "Spicy Red Chilli",
    rating: 4.92,
    reviewsCount: 96,
    image: "/images/spicy-chilli.jpg",
    gallery: ["/images/spicy-chilli.jpg", "/images/hero-pickle.jpg"],
    ingredients: [
      "Wild & Farm Harvested Mushrooms",
      "Smoked Himalayan Red Chillies",
      "Timur (Pahadi Pepper Berry)",
      "Pure Cold-Pressed Mustard Oil",
      "Crushed Mustard & Nigella Seeds",
      "Himalayan Black Salt & Pink Salt",
      "Dried Ginger Flakes (Sonth)",
      "Fresh Lemon Juice Extract",
    ],
    shelfLife: "12 Months (Store in airtight jar)",
    spiceLevel: "Hot",
    isFeatured: true,
    stockCount: 38,
    sizes: [
      { size: "250g", price: 319, originalPrice: 380, inStock: true },
      { size: "500g", price: 579, originalPrice: 690, inStock: true },
      { size: "1kg", price: 1049, originalPrice: 1250, inStock: true },
    ],
    badges: ["Fiery Punch", "Mountain Spices", "100% Handcrafted"],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Aditi Sharma",
    location: "New Delhi",
    rating: 5,
    date: "14 Oct 2026",
    comment:
      "The Classic Masala mushroom pickle exceeded all my expectations! The mushrooms have an amazing meaty texture and the mustard oil smells pure and authentic, just like what my grandmother used to make in her ceramic jar.",
    productName: "Classic Masala Oyster Mushroom Pickle",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Vikram Sengupta",
    location: "Bengaluru",
    rating: 5,
    date: "10 Oct 2026",
    comment:
      "The Garlic Shiitake pickle is mind-blowing. The whole garlic cloves melt in the mouth with warm parathas. Ordering the 1kg jar right now because the 250g finished in 4 days!",
    productName: "Slow-Roasted Garlic Shiitake Mushroom Pickle",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Pooja Kulkarni",
    location: "Pune",
    rating: 5,
    date: "05 Oct 2026",
    comment:
      "So happy to find a brand that doesn't use sodium benzoate or artificial vinegar. You can taste the genuine cold-pressed oil and earthy spices. Akhil Foods is now a pantry staple for us.",
    productName: "Heritage Mustard Oil Button Mushroom Pickle",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Rohit Narang",
    location: "Chandigarh",
    rating: 5,
    date: "28 Sep 2026",
    comment:
      "The Pahadi Red Chilli pickle has that authentic fiery kick with timur pepper aroma. Pairs insanely well with dal chawal, curd rice, and stuffed kulchas. High quality packaging too!",
    productName: "Spicy Red Chilli Pahadi Mushroom Pickle",
    verified: true,
  },
];

export const FAQS = [
  {
    question: "How long does Akhil Foods mushroom pickle last without preservatives?",
    answer:
      "Our pickles have a natural shelf-life of 12 months. We use traditional preservation science: raw cold-pressed Kacchi Ghani mustard oil, optimal Himalayan rock salt balance, and sun curing. The oil acts as a natural barrier against air and moisture. Always use a clean, dry spoon and keep the mushroom pieces submerged in oil.",
  },
  {
    question: "What kind of mushrooms do you use?",
    answer:
      "We strictly use fresh, farm-grown Oyster (Dhingri), Button, and premium Shiitake mushrooms harvested daily from climate-controlled sustainable mushroom farms. They are hand-trimmed and sun-dried to lock in maximum umami and firmness before pickling.",
  },
  {
    question: "Do you ship all over India?",
    answer:
      "Yes! We deliver across 19,000+ pincodes in India via express air courier partners (BlueDart, Delhivery, DTDC). Standard delivery takes 2 to 4 business days in metro cities, and 4 to 6 days in regional areas.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We accept Cash on Delivery (COD) as well as all online payments including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Netbanking via Razorpay.",
  },
  {
    question: "Can I order directly on WhatsApp?",
    answer:
      "Absolutely! You can click the 'Order on WhatsApp' button on any product page or checkout page. It immediately generates your order details and sends them directly to our personal customer care desk for priority dispatch.",
  },
];

export const PINCODES_INFO: Record<string, { city: string; state: string; days: string }> = {
  "110001": { city: "New Delhi", state: "Delhi", days: "2-3 business days" },
  "400001": { city: "Mumbai", state: "Maharashtra", days: "2-3 business days" },
  "560001": { city: "Bengaluru", state: "Karnataka", days: "2-3 business days" },
  "700001": { city: "Kolkata", state: "West Bengal", days: "3-4 business days" },
  "600001": { city: "Chennai", state: "Tamil Nadu", days: "3-4 business days" },
  "500001": { city: "Hyderabad", state: "Telangana", days: "2-3 business days" },
  "380001": { city: "Ahmedabad", state: "Gujarat", days: "2-3 business days" },
  "160017": { city: "Chandigarh", state: "Punjab", days: "1-2 business days" },
  "201301": { city: "Noida", state: "Uttar Pradesh", days: "1-2 business days" },
  "122001": { city: "Gurugram", state: "Haryana", days: "1-2 business days" },
  "302001": { city: "Jaipur", state: "Rajasthan", days: "2-3 business days" },
  "411001": { city: "Pune", state: "Maharashtra", days: "2-3 business days" },
  "682001": { city: "Kochi", state: "Kerala", days: "3-4 business days" },
  "751001": { city: "Bhubaneswar", state: "Odisha", days: "3-4 business days" },
  "781001": { city: "Guwahati", state: "Assam", days: "4-5 business days" },
};
