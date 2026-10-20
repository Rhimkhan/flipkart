export interface FAQItem {
  question: string;
  answer: string;
  category: "all" | "ingredients" | "preparation" | "storage" | "shipping";
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: "ingredients",
    question: "What ingredients are used in Mushroom Mela Oyster Mushroom Pickle?",
    answer:
      "Our pickle contains tender oyster mushrooms, pure mustard oil, vinegar, salt, red chilli, coriander, mustard, fennel, fenugreek, cumin, turmeric, ajwain, ginger, garlic, and permitted additives. Net quantity is 400g.",
  },
  {
    category: "ingredients",
    question: "Are Akhil Foods mushroom pickles 100% vegetarian?",
    answer:
      "Yes, 100%! All our ingredients are plant-based and completely vegetarian. We use tender oyster mushrooms, pure mustard oil, vinegar, and traditional stone-ground Indian spices.",
  },
  {
    category: "preparation",
    question: "Where is AKHIL FOODS based and where is the pickle made?",
    answer:
      "AKHIL FOODS is located in Village Nandsiya, Karguwan Road, Near Ambedkar Murti, Moth, Jhansi, Uttar Pradesh - 284303. All our mushroom pickles are handcrafted and packed right here.",
  },
  {
    category: "ingredients",
    question: "Is AKHIL FOODS officially certified by FSSAI and registered with the Government?",
    answer:
      "Yes. AKHIL FOODS is fully certified and registered with the Government of India. Our Food Safety and Standards Authority of India registration is FSSAI Lic. No. 22726293000001 (valid until 31-12-2026). Our GSTIN registration is 09FTOPD3011E1ZZ, and our MSME enterprise registration is UDYAM-UP-39-0059446.",
  },
  {
    category: "storage",
    question: "What is the shelf life and how should I store the pickle?",
    answer:
      "Store in a cool, dry place. Keep away from direct sunlight. Always use a clean, dry spoon to maintain freshness.",
  },
  {
    category: "storage",
    question: "Does the pickle need to be refrigerated after opening?",
    answer:
      "Refrigeration is not mandatory. Keep the jar in a cool, dry place away from moisture and heat. However, keeping it in the refrigerator after opening also works great.",
  },
  {
    category: "shipping",
    question: "How do you pack glass jars so they don't break during courier transit?",
    answer:
      "We take courier packaging very seriously. Every 400g glass jar is encased in shock-buffer packaging and double-walled cartons to ensure safe arrival.",
  },
  {
    category: "shipping",
    question: "How long does delivery take across India?",
    answer:
      "Orders are dispatched promptly from our facility in Jhansi, Uttar Pradesh via reliable courier partners. Delivery typically takes 2 to 5 business days depending on your location.",
  },
  {
    category: "shipping",
    question: "What payment methods are supported?",
    answer:
      "We accept Cash on Delivery (COD) as well as secure online payments via Razorpay (UPI, Google Pay, PhonePe, Paytm, Cards, and Netbanking). You can also order directly on WhatsApp.",
  },
  {
    category: "shipping",
    question: "Can I order directly on WhatsApp?",
    answer:
      "Yes! You can message us on WhatsApp at 916386423865 (+91 63864 23865) to place your order directly with our team.",
  },
];
