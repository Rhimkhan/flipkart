export interface FAQItem {
  question: string;
  answer: string;
  category: "all" | "ingredients" | "clay" | "storage" | "shipping";
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: "ingredients",
    question: "Are Akhil Foods mushroom pickles 100% vegetarian and vegan?",
    answer:
      "Yes, 100%! All our pickles are plant-based and completely vegan. We use freshly harvested farm mushrooms (Oyster, Shiitake, Button), raw cold-pressed mustard oil, whole spices, and Himalayan pink rock salt. There is zero dairy, zero animal derivatives, and zero artificial flavour enhancers.",
  },
  {
    category: "ingredients",
    question: "Do you use chemical preservatives, artificial colors, or synthetic acetic acid?",
    answer:
      "Absolutely never. Unlike industrial pickles that use synthetic acetic acid (chemical vinegar) and sodium benzoate, we rely exclusively on ancestral preservation: natural rock salt (sendha namak), sun-curing, cold-pressed mustard oil barrier, and the natural probiotic acidity generated during clay-pot aging.",
  },
  {
    category: "clay",
    question: "Why do you ferment and age pickles in traditional earthenware (Mitti Handi)?",
    answer:
      "Traditional terracotta handis and glazed martaban barnis have microscopic porous walls that permit gentle, slow oxygen exchange. This micro-breathing process eliminates the harsh pungent bite of raw mustard oil, naturally balances pH alkalinity, and allows beneficial probiotic cultures to flourish. The result is a smooth, rich, deep umami that no stainless-steel industrial vat can duplicate.",
  },
  {
    category: "clay",
    question: "Where are the mushrooms grown and harvested?",
    answer:
      "All our mushrooms are cultivated in Solan, Himachal Pradesh — celebrated across the country as the 'Mushroom City of India'. Grown at 1,600 meters altitude with pristine Himalayan mountain air and mineral spring water, our mushrooms develop an exceptionally tender, meaty texture that absorbs spice infusions deeply.",
  },
  {
    category: "storage",
    question: "What is the shelf life and how should I store the pickle?",
    answer:
      "Our pickles have a natural shelf life of 12 months from the date of bottling. Because we do not use chemical preservatives, always follow two simple rules: 1) Always use a clean, completely dry spoon, and 2) Ensure the top layer of mushrooms remains gently coated with the natural mustard oil. Store in a cool, dry cupboard away from direct heat.",
  },
  {
    category: "storage",
    question: "Does the pickle need to be refrigerated after opening?",
    answer:
      "Refrigeration is not mandatory! Natural cold-pressed mustard oil and rock salt are ancient preservatives that keep the pickle fresh at room temperature for months. However, if you reside in an extremely humid tropical coastal region or prefer chilled crunch, you may refrigerate it after opening without losing flavor.",
  },
  {
    category: "shipping",
    question: "How do you pack glass jars so they don't break during courier transit?",
    answer:
      "We take courier packaging very seriously. Every glass jar is encased in an impact-absorbing honeycomb paper sleeve, wrapped in multiple shock-buffer layers, and shipped inside heavy-duty double-walled corrugated shipping cartons. Our transit breakage rate is less than 0.1%. In the rare event of transit damage, we immediately dispatch a brand-new replacement at zero cost.",
  },
  {
    category: "shipping",
    question: "How long does delivery take across India?",
    answer:
      "Orders placed before 2:00 PM are dispatched on the same day from our Solan facility via express air courier (Bluedart, Delhivery, Xpressbees). Metro cities typically receive deliveries within 2 to 3 days, while rest of India arrives within 4 to 5 business days. You receive live SMS and WhatsApp tracking as soon as the package ships.",
  },
  {
    category: "shipping",
    question: "What payment methods are supported?",
    answer:
      "We accept Cash on Delivery (COD) across 19,000+ Indian pincodes, as well as instant secure online payments via Razorpay (UPI, Google Pay, PhonePe, Paytm, Credit/Debit Cards, and Netbanking).",
  },
  {
    category: "ingredients",
    question: "Which flavour is best for people with low spice tolerance?",
    answer:
      "For those who prefer mild, comforting warmth over sharp heat, we highly recommend our 'Traditional Mustard Oil Button Mushroom Pickle' or our bestselling 'Classic Masala Oyster Mushroom Pickle'. For lovers of sweet, caramelized depth, the 'Slow-Roasted Garlic Shiitake' is an absolute favorite.",
  },
  {
    category: "shipping",
    question: "Do you offer corporate gifting or custom wedding hampers?",
    answer:
      "Yes! We curate handcrafted wooden crates and bespoke terracotta gift hampers with custom personalized handwritten tags for weddings, festive corporate gifts, and special occasions. Reach out to our team on WhatsApp or via our contact form for wholesale catalogues.",
  },
  {
    category: "ingredients",
    question: "Is AKHIL FOODS officially certified by FSSAI and registered with the Government?",
    answer:
      "Yes, absolutely. AKHIL FOODS is fully certified and registered with the Government of India. Our Food Safety and Standards Authority of India registration is FSSAI Reg. No. 22726293000001 (valid until 31-12-2026). Our GSTIN registration is 09FTOPD3011E1ZZ, and our MSME enterprise registration is UDYAM-UP-39-0059446. Every micro-batch strictly complies with government food hygiene and safety standards.",
  },
];
