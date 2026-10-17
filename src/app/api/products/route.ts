import { NextRequest, NextResponse } from "next/server";
import { getLocalProducts, saveLocalProducts } from "@/lib/store";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { Product } from "@/lib/types";
import { supabase } from "@/lib/supabase";

// Normalize database row to application Product interface
function normalizeProductRow(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    subtitle: row.subtitle || row.description?.slice(0, 80) + "...",
    description: row.description || "",
    flavour: row.flavour,
    rating: Number(row.rating) || 5.0,
    reviewsCount: Number(row.reviews_count) || 10,
    image: row.image_url || row.image || "/images/hero-pickle.jpg",
    gallery: Array.isArray(row.gallery) && row.gallery.length > 0 ? row.gallery : [row.image_url || row.image || "/images/hero-pickle.jpg"],
    ingredients: Array.isArray(row.ingredients) ? row.ingredients : [],
    shelfLife: row.shelf_life || row.shelfLife || "12 Months",
    spiceLevel: row.spice_level || row.spiceLevel || "Medium",
    isFeatured: Boolean(row.is_featured ?? true),
    stockCount: Number(row.stock ?? row.stock_count ?? 50),
    sizes: Array.isArray(row.sizes) ? row.sizes : [
      { size: "250g", price: 299, originalPrice: 350, inStock: true },
      { size: "500g", price: 549, originalPrice: 650, inStock: true },
      { size: "1kg", price: 999, originalPrice: 1200, inStock: true },
    ],
    badges: Array.isArray(row.badges) ? row.badges : ["Artisanal Harvest"],
  };
}

export async function GET() {
  try {
    // 1. If Supabase is connected, attempt to fetch from Supabase
    if (supabase) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        const normalized = data.map(normalizeProductRow);
        return NextResponse.json({ success: true, products: normalized, source: "supabase" });
      }
    }

    // 2. Fallback to local persistent store / seed data
    const local = getLocalProducts();
    const products = local.length > 0 ? local : INITIAL_PRODUCTS;
    return NextResponse.json({ success: true, products, source: "local" });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ success: true, products: INITIAL_PRODUCTS, source: "fallback" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. If Supabase is connected, insert/update in Supabase
    if (supabase) {
      const dbPayload = {
        id: body.id || `prod-${Date.now()}`,
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        subtitle: body.subtitle || "",
        flavour: body.flavour || "Classic",
        description: body.description || "",
        ingredients: body.ingredients || [],
        shelf_life: body.shelfLife || "12 Months",
        image_url: body.image || body.imageUrl || "/images/hero-pickle.jpg",
        image: body.image || body.imageUrl || "/images/hero-pickle.jpg",
        sizes: body.sizes || [],
        stock: Number(body.stockCount || body.stock || 50),
        stock_count: Number(body.stockCount || body.stock || 50),
        rating: Number(body.rating || 5.0),
        reviews_count: Number(body.reviewsCount || 0),
        gallery: body.gallery || [body.image || "/images/hero-pickle.jpg"],
        spice_level: body.spiceLevel || "Medium",
        is_featured: Boolean(body.isFeatured),
        badges: body.badges || [],
      };

      const { data, error } = await supabase
        .from("products")
        .upsert(dbPayload)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, product: normalizeProductRow(data), source: "supabase" });
      }
    }

    // 2. Local store fallback
    const current = getLocalProducts();
    if (body.id) {
      const index = current.findIndex((p) => p.id === body.id);
      if (index !== -1) {
        current[index] = { ...current[index], ...body };
        saveLocalProducts(current);
        return NextResponse.json({ success: true, product: current[index], source: "local" });
      }
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      subtitle: body.subtitle || "Handcrafted Artisanal Pickle",
      description: body.description || "",
      flavour: body.flavour || "Special Blend",
      rating: 5.0,
      reviewsCount: 1,
      image: body.image || "/images/hero-pickle.jpg",
      gallery: body.gallery || [body.image || "/images/hero-pickle.jpg"],
      ingredients: body.ingredients || ["Farm Mushrooms", "Mustard Oil", "Himalayan Spices"],
      shelfLife: body.shelfLife || "12 Months",
      spiceLevel: body.spiceLevel || "Medium",
      isFeatured: Boolean(body.isFeatured),
      stockCount: Number(body.stockCount) || 50,
      sizes: body.sizes || [
        { size: "250g", price: 299, originalPrice: 350, inStock: true },
        { size: "500g", price: 549, originalPrice: 650, inStock: true },
        { size: "1kg", price: 999, originalPrice: 1200, inStock: true },
      ],
      badges: body.badges || ["New Harvest"],
    };

    const updated = [newProduct, ...current];
    saveLocalProducts(updated);
    return NextResponse.json({ success: true, product: newProduct, source: "local" }, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to save product" }, { status: 500 });
  }
}
