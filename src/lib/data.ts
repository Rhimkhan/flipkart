import { Product, Review } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-mushroom-mela",
    name: "Mushroom Mela Oyster Mushroom Pickle",
    slug: "mushroom-mela-oyster-mushroom-pickle",
    subtitle: "Artisanal handcrafted oyster mushroom pickle in pure mustard oil & spices",
    description:
      "Authentic handcrafted oyster mushroom pickle by AKHIL FOODS, prepared in Village Nandsiya, Moth, Jhansi, Uttar Pradesh. Made with tender oyster mushrooms steeped in pure mustard oil, vinegar, and traditional stone-ground Indian spices for a rich, delicious taste.",
    flavour: "Oyster Mushroom",
    rating: 0,
    reviewsCount: 0,
    image: "/images/products/mushroom-mela-front.jpg",
    gallery: [
      "/images/products/mushroom-mela-front.jpg",
      "/images/products/mushroom-mela-side.jpg",
      "/images/products/mushroom-mela-ingredients.jpg",
      "/images/products/mushroom-mela-back.jpg",
    ],
    ingredients: [
      "Mushroom",
      "Mustard Oil",
      "Vinegar",
      "Salt",
      "Red Chilli",
      "Coriander",
      "Mustard",
      "Fennel",
      "Fenugreek",
      "Cumin",
      "Turmeric",
      "Ajwain",
      "Ginger",
      "Garlic",
      "Permitted Additives",
    ],
    shelfLife: "Store in a cool, dry place, keep away from direct sunlight, use a clean dry spoon.",
    spiceLevel: "Medium",
    isFeatured: true,
    stockCount: 100,
    sizes: [
      { size: "400g", price: 399, originalPrice: 399, inStock: true },
    ],
    badges: ["Artisanal", "Oyster Mushroom", "400g Jar", "FSSAI Registered"],
  },
];

export const REVIEWS: Review[] = [];

export const FAQS = [
  {
    question: "Where is AKHIL FOODS located?",
    answer:
      "AKHIL FOODS is based in Village Nandsiya, Karguwan Road, Near Ambedkar Murti, Moth, Jhansi, Uttar Pradesh - 284303. All our mushroom pickles are handcrafted and packed right here.",
  },
  {
    question: "What ingredients are used in Mushroom Mela Oyster Mushroom Pickle?",
    answer:
      "Our pickle is made with Mushroom, mustard oil, vinegar, salt, red chilli, coriander, mustard, fennel, fenugreek, cumin, turmeric, ajwain, ginger, garlic, and permitted additives. Net quantity is 400g.",
  },
  {
    question: "How should I store the pickle?",
    answer:
      "Store in a cool, dry place. Keep away from direct sunlight. Always use a clean, dry spoon.",
  },
  {
    question: "Is AKHIL FOODS FSSAI certified and registered?",
    answer:
      "Yes, AKHIL FOODS holds FSSAI Lic. No. 22726293000001 (valid till 31-12-2026), GSTIN 09FTOPD3011E1ZZ, and Udyam Reg. No. UDYAM-UP-39-0059446.",
  },
  {
    question: "Do you deliver across India?",
    answer:
      "Yes! We deliver across India via reliable courier partners. Standard delivery takes 2 to 5 business days.",
  },
  {
    question: "Can I order directly on WhatsApp?",
    answer:
      "Yes! You can click the 'Order on WhatsApp' button on any page to chat directly with us on 6966558899 and place your order.",
  },
];

export const PINCODES_INFO: Record<string, { city: string; state: string; days: string }> = {
  "284303": { city: "Moth, Jhansi", state: "Uttar Pradesh", days: "1-2 business days (Local Delivery)" },
  "284001": { city: "Jhansi", state: "Uttar Pradesh", days: "1-2 business days" },
  "208001": { city: "Kanpur", state: "Uttar Pradesh", days: "2-3 business days" },
  "226001": { city: "Lucknow", state: "Uttar Pradesh", days: "2-3 business days" },
  "110001": { city: "New Delhi", state: "Delhi", days: "2-3 business days" },
  "400001": { city: "Mumbai", state: "Maharashtra", days: "3-4 business days" },
  "560001": { city: "Bengaluru", state: "Karnataka", days: "3-4 business days" },
  "700001": { city: "Kolkata", state: "West Bengal", days: "3-4 business days" },
  "600001": { city: "Chennai", state: "Tamil Nadu", days: "3-4 business days" },
  "500001": { city: "Hyderabad", state: "Telangana", days: "3-4 business days" },
};
