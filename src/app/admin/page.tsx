"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Search,
  MessageCircle,
  Truck,
  ShieldCheck,
  Save,
  X,
  Upload,
  LogOut,
  Mail,
  Key,
  ExternalLink,
  Eye,
} from "lucide-react";
import { Order, OrderStatus, Product, ProductSize, PaymentStatus } from "@/lib/types";
import {
  getLocalOrders,
  getLocalProducts,
  saveLocalProducts,
  updateLocalOrderStatus,
} from "@/lib/store";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { BRAND } from "@/lib/brand";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);

  // Auth form
  const [emailInput, setEmailInput] = useState("abhishekkumarnandsiya@gmail.com");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Tab & Data State
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchOrder, setSearchOrder] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // View Order Details Modal
  const [selectedOrderForView, setSelectedOrderForView] = useState<Order | null>(null);

  // Edit / Add Product State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form Fields
  const [prodName, setProdName] = useState("");
  const [prodSubtitle, setProdSubtitle] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodFlavour, setProdFlavour] = useState("Classic Masala");
  const [prodIngredients, setProdIngredients] = useState(
    "Fresh Mushrooms, Mustard Oil, Salt, Whole Spices"
  );
  const [prodShelfLife, setProdShelfLife] = useState(
    "12 Months (Store in a cool, dry place. Keep submerged in mustard oil)"
  );
  const [prodSpice, setProdSpice] = useState<"Mild" | "Medium" | "Hot">("Medium");
  const [prodPrice250, setProdPrice250] = useState(299);
  const [prodPrice500, setProdPrice500] = useState(549);
  const [prodPrice1kg, setProdPrice1kg] = useState(999);
  const [prodStock, setProdStock] = useState(50);
  const [prodImage, setProdImage] = useState("/images/hero-pickle.jpg");

  // Check existing session on server
  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.authenticated) {
          setIsAuthenticated(true);
          setAdminUser("Master Administrator");
        }
      })
      .catch((err) => {
        console.warn("Session check error:", err);
      });
  }, []);

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Orders
      const resOrders = await fetch("/api/orders");
      const ordersData = await resOrders.json();
      if (ordersData?.orders && Array.isArray(ordersData.orders) && ordersData.orders.length > 0) {
        setOrders(ordersData.orders);
      } else {
        setOrders(getLocalOrders());
      }

      // 2. Fetch Products
      const resProducts = await fetch("/api/products");
      const productsData = await resProducts.json();
      if (
        productsData?.products &&
        Array.isArray(productsData.products) &&
        productsData.products.length > 0
      ) {
        setProducts(productsData.products);
      } else {
        const local = getLocalProducts();
        setProducts(local.length ? local : INITIAL_PRODUCTS);
      }
    } catch (e) {
      console.error("Load data error:", e);
      setOrders(getLocalOrders());
      setProducts(getLocalProducts());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Handle Login via Server-side Verification & httpOnly Cookie Session
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.trim(),
          password: passwordInput,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError(data.error || "Authentication failed. Check your password.");
        setAuthLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setAdminUser(emailInput.trim() || "Master Administrator");
      setPasswordInput("");
      setFeedbackMsg("Welcome to Akhil Foods Admin Portal");
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch (err: any) {
      setAuthError(err?.message || "Server connection error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setAdminUser(null);
    setPasswordInput("");
  };

  // Pre-filled WhatsApp Customer Message Generator
  const getWhatsAppCustomerMessage = (order: Order): string => {
    const itemsText = order.items
      ?.map((i) => `* ${i.name} (${i.size}) x${i.quantity}`)
      .join("\n");

    const appUrl = typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || "");
    const trackingText = order.trackingNumber
      ? `\n\nCourier Dispatch Details:\n- Logistics Partner: ${order.courierName || "Courier"}\n- Tracking Number: ${order.trackingNumber}\n- Track Order: ${appUrl}/track-order?q=${order.orderNumber}`
      : `\n\nStatus: Preparing your Mushroom Mela pickle order in Village Nandsiya, Moth, Jhansi.`;

    return `Hi ${order.customerName}, greetings from Akhil Foods.

Thank you for your order *#${order.orderNumber}*.

Items in your parcel:
${itemsText}

Total Amount: Rs ${order.total} (${order.paymentMethod})
Shipping Destination: ${order.address}, ${order.city} - ${order.pincode}
Current Status: ${order.orderStatus}${trackingText}

If you have any questions, reply here.
- Akhil Foods, Village Nandsiya, Moth, Jhansi`;
  };

  // Image Upload Handler
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProdImage(reader.result);
        setFeedbackMsg("Image uploaded & attached!");
        setTimeout(() => setFeedbackMsg(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  // Status Change for Orders
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      updateLocalOrderStatus(orderId, newStatus);
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, orderStatus: newStatus }),
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
      );

      setFeedbackMsg(`Order #${orderId} marked as ${newStatus}`);
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Mark Payment as Paid
  const handleMarkAsPaid = async (orderId: string) => {
    try {
      updateLocalOrderStatus(orderId, undefined, undefined, undefined, "Paid");
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, paymentStatus: "Paid" }),
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: "Paid" } : o))
      );

      setSelectedOrderForView((prev) =>
        prev && prev.id === orderId ? { ...prev, paymentStatus: "Paid" } : prev
      );

      setFeedbackMsg(`Order #${orderId} payment marked as Paid!`);
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch (err) {
      console.error("Failed to mark order payment as paid", err);
    }
  };

  // Update Tracking for Orders
  const handleUpdateTracking = async (
    orderId: string,
    trackingNumber: string,
    courierName: string
  ) => {
    try {
      updateLocalOrderStatus(orderId, "Shipped", trackingNumber, courierName);
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          orderStatus: "Shipped",
          trackingNumber,
          courierName,
        }),
      });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? { ...o, orderStatus: "Shipped", trackingNumber, courierName }
            : o
        )
      );

      setFeedbackMsg(`Consignment tracking updated for order #${orderId}`);
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch (err) {
      console.error("Failed to update tracking", err);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this product?")) {
      try {
        await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      } catch {
        // ignore
      }
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveLocalProducts(updated);
      setFeedbackMsg("Product removed from catalog");
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  // Add / Edit Product Save
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    const ingredientsArray = prodIngredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: prodName.trim(),
      slug:
        editingProduct?.slug ||
        prodName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      subtitle:
        prodSubtitle.trim() || "Handcrafted Artisanal Oyster Mushroom Pickle",
      description:
        prodDescription.trim() ||
        "Authentic handcrafted oyster mushroom pickle by AKHIL FOODS, prepared in Village Nandsiya, Moth, Jhansi, Uttar Pradesh.",
      flavour: prodFlavour,
      rating: editingProduct?.rating || 0,
      reviewsCount: editingProduct?.reviewsCount || 0,
      image: prodImage || "/images/products/mushroom-mela-front.jpg",
      gallery: [prodImage || "/images/products/mushroom-mela-front.jpg"],
      ingredients:
        ingredientsArray.length > 0
          ? ingredientsArray
          : ["Mushroom", "Mustard Oil", "Vinegar", "Spices"],
      shelfLife: prodShelfLife,
      spiceLevel: prodSpice,
      isFeatured: true,
      stockCount: Number(prodStock),
      sizes: [
        {
          size: "250g",
          price: Number(prodPrice250),
          originalPrice: Math.round(Number(prodPrice250) * 1.2),
          inStock: true,
        },
        {
          size: "500g",
          price: Number(prodPrice500),
          originalPrice: Math.round(Number(prodPrice500) * 1.2),
          inStock: true,
        },
        {
          size: "1kg",
          price: Number(prodPrice1kg),
          originalPrice: Math.round(Number(prodPrice1kg) * 1.2),
          inStock: true,
        },
      ],
      badges: editingProduct?.badges || ["Fresh Harvest"],
    };

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });
    } catch (err) {
      console.warn("API sync error:", err);
    }

    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id ? productPayload : p
      );
      setProducts(updated);
      saveLocalProducts(updated);
      setFeedbackMsg("Product pricing and details updated!");
    } else {
      const updated = [productPayload, ...products];
      setProducts(updated);
      saveLocalProducts(updated);
      setFeedbackMsg("New pickle variety added to storefront!");
    }

    setShowProductModal(false);
    setEditingProduct(null);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdSubtitle(p.subtitle);
    setProdDescription(p.description);
    setProdFlavour(p.flavour);
    setProdIngredients(
      Array.isArray(p.ingredients) ? p.ingredients.join(", ") : ""
    );
    setProdShelfLife(p.shelfLife);
    setProdSpice(p.spiceLevel as "Mild" | "Medium" | "Hot");
    setProdPrice250(p.sizes.find((s) => s.size === "250g")?.price || 299);
    setProdPrice500(p.sizes.find((s) => s.size === "500g")?.price || 549);
    setProdPrice1kg(p.sizes.find((s) => s.size === "1kg")?.price || 999);
    setProdStock(p.stockCount);
    setProdImage(p.image);
    setShowProductModal(true);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "New" || o.orderStatus === "Packed"
  ).length;

  // 1. Password Protected Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#FAF6EE]">
        <div className="bg-[#FDFBF7] p-8 sm:p-10 rounded-[6px] border border-[#E8DEC8] shadow-sm max-w-md w-full space-y-6 text-center">
          <div className="w-16 h-16 rounded-[6px] bg-[#1C130E] text-[#FAF6EE] border border-[#C89B3C]/40 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8 text-[#C89B3C]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF6EE] bg-[#1C130E] border border-[#C89B3C]/30 px-3 py-1 rounded-[4px]">
              Restricted Area
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#211612] pt-2">
              Staff & Admin Portal
            </h1>
            <p className="text-xs text-[#3D2C24]/70 font-sans">
              Sign in with Supabase Authentication or staff passkey to manage products, pricing, and orders.
            </p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-[6px] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#211612] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#A87B28]" />
                <span>Admin Email</span>
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="abhishekkumarnandsiya@gmail.com"
                className="w-full px-4 py-3 rounded-[6px] border border-[#E8DEC8] bg-[#FAF6EE] text-xs text-[#211612] focus:outline-none focus:ring-1 focus:ring-[#211612]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#211612] flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#A87B28]" />
                <span>Password / Passkey</span>
              </label>
              <input
                type="password"
                required
                placeholder="Enter password or passkey"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-[6px] border border-[#E8DEC8] bg-[#FAF6EE] text-xs text-[#211612] focus:outline-none focus:ring-1 focus:ring-[#211612]"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-[6px] bg-[#211612] hover:bg-[#1C130E] text-[#FAF6EE] border border-[#211612] font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Unlock className="w-4 h-4 text-[#C89B3C]" />
              <span>{authLoading ? "Authenticating..." : "Unlock Store Admin"}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#E8DEC8] space-y-1 text-[11px] text-[#3D2C24]/60 text-center">
            <p>
              Authorized personnel only. Enter your administrator password to proceed.
            </p>
            <p className="text-[10px] text-stone-400">
              {isSupabaseConfigured
                ? "Supabase Auth is enabled"
                : "Operating in secured local-mode"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber?.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.phone?.includes(searchOrder) ||
      o.orderStatus?.toLowerCase().includes(searchOrder.toLowerCase())
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchProduct.toLowerCase()) ||
      p.flavour?.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className="py-10 sm:py-16 bg-[#FAF6EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header with Signed-in Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DEC8] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-emerald-600"></span>
              <span className="text-xs font-bold text-[#A87B28] uppercase tracking-wider">
                Store Operations • {adminUser}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#211612]">
              Store Management Portal
            </h1>
            <div className="flex flex-wrap items-center gap-2 pt-1.5 text-[11px] font-mono text-[#211612]">
              <span className="bg-[#FAF6EE] px-2.5 py-0.5 rounded-[4px] border border-[#E8DEC8] shadow-xs">
                FSSAI: <strong>{BRAND.fssaiNumber}</strong> (till {BRAND.fssaiValidity})
              </span>
              <span className="bg-[#FAF6EE] px-2.5 py-0.5 rounded-[4px] border border-[#E8DEC8] shadow-xs">
                GSTIN: <strong>{BRAND.gstNumber}</strong>
              </span>
              <span className="bg-[#FAF6EE] px-2.5 py-0.5 rounded-[4px] border border-[#E8DEC8] shadow-xs">
                Udyam: <strong>{BRAND.udyamNumber}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="px-4 py-2.5 rounded-[6px] bg-[#FDFBF7] border border-[#E8DEC8] text-xs font-semibold text-[#211612] hover:bg-[#FAF6EE] flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Data</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-[6px] bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {feedbackMsg && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-semibold uppercase">Total Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#211612]">
              ₹{totalRevenue}
            </div>
            <p className="text-[11px] text-[#3D2C24]/60">Gross order book</p>
          </div>

          <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-semibold uppercase">Total Orders</span>
              <Package className="w-4 h-4 text-[#A87B28]" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#211612]">
              {orders.length}
            </div>
            <p className="text-[11px] text-[#3D2C24]/60">Recorded orders</p>
          </div>

          <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-semibold uppercase">Pending Dispatch</span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-700">
              {pendingOrders}
            </div>
            <p className="text-[11px] text-[#3D2C24]/60">New & Packed batches</p>
          </div>

          <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs font-semibold uppercase">Active Catalog</span>
              <ShoppingBag className="w-4 h-4 text-[#A87B28]" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#211612]">
              {products.length}
            </div>
            <p className="text-[11px] text-[#3D2C24]/60">Pickle varieties</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-4 border-b border-[#E8DEC8]">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === "orders" ? "text-[#211612]" : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <span>Orders Management ({orders.length})</span>
            {activeTab === "orders" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#211612]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === "products" ? "text-[#211612]" : "text-stone-400 hover:text-stone-600"
            }`}
          >
            <span>Products & Inventory ({products.length})</span>
            {activeTab === "products" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#211612]" />
            )}
          </button>
        </div>

        {/* TAB 1: ORDERS WITH DIRECT WHATSAPP BUTTON & STATUS UPDATES */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Filter by Order #, Customer, Phone..."
                  value={searchOrder}
                  onChange={(e) => setSearchOrder(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-2xl bg-[#FDFBF7] border border-[#E8DEC8] text-xs focus:outline-none focus:ring-2 focus:ring-[#211612]"
                />
              </div>
              <span className="text-xs text-stone-500">
                Showing {filteredOrders.length} orders
              </span>
            </div>

            <div className="bg-[#FDFBF7] rounded-[32px] border border-[#E8DEC8] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6EE] text-[#211612] font-bold border-b border-[#E8DEC8] uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">Order #</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status Pipeline</th>
                      <th className="p-4 text-right">Customer WhatsApp & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DEC8]/50">
                    {filteredOrders.map((order) => {
                      const cleanPhone = order.phone?.replace(/\D/g, "") || "";
                      const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                        getWhatsAppCustomerMessage(order)
                      )}`;

                      return (
                        <tr key={order.id} className="hover:bg-[#FAF6EE]/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#211612]">
                            <button
                              onClick={() => setSelectedOrderForView(order)}
                              className="hover:underline flex items-center gap-1 text-[#211612]"
                            >
                              <span>{order.orderNumber}</span>
                              <Eye className="w-3 h-3 text-stone-400" />
                            </button>
                            <div className="text-[10px] text-stone-400 font-normal">
                              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-[#211612]">{order.customerName}</div>
                            <div className="text-stone-500 text-[11px] font-mono">{order.phone}</div>
                            <div className="text-stone-400 text-[10px] truncate max-w-[150px]">
                              {order.city}, {order.pincode}
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="space-y-1">
                              {order.items?.map((item, i) => (
                                <div key={i} className="text-[#3D2C24]">
                                  <span className="font-medium">{item.name}</span>{" "}
                                  <span className="text-[10px] text-[#211612] bg-[#FAF6EE] px-1.5 py-0.5 rounded font-bold border border-[#E8DEC8]">
                                    {item.size} × {item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="font-serif font-bold text-sm text-[#211612]">
                              ₹{order.total}
                            </span>
                          </td>

                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold ${
                                order.paymentStatus === "Paid"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : order.paymentStatus === "Awaiting verification"
                                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                                  : order.paymentMethod.includes("Cash")
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-stone-100 text-stone-700 border border-stone-200"
                              }`}
                            >
                              {order.paymentMethod.includes("Cash")
                                ? "COD"
                                : order.paymentMethod.includes("UPI")
                                ? "UPI QR"
                                : "Online"}{" "}
                              ({order.paymentStatus})
                            </span>
                            {order.utr && (
                              <div className="text-[10px] font-mono text-[#A87B28] font-bold mt-1">
                                UTR: {order.utr}
                              </div>
                            )}
                          </td>

                          {/* Order Status Select (New, Packed, Shipped, Delivered) */}
                          <td className="p-4">
                            <select
                              value={order.orderStatus}
                              onChange={(e) =>
                                handleStatusChange(order.id, e.target.value as OrderStatus)
                              }
                              className="px-3 py-1.5 rounded-[6px] border border-[#E8DEC8] bg-[#FAF6EE] text-xs font-semibold text-[#211612] focus:outline-none focus:ring-1 focus:ring-[#211612]"
                            >
                              <option value="New">New</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>

                          {/* Direct WhatsApp Button & Action tools */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Mark as Paid button for orders not yet paid */}
                              {order.paymentStatus !== "Paid" && (
                                <button
                                  onClick={() => handleMarkAsPaid(order.id)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
                                  title="Mark Payment as Paid"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Mark as Paid</span>
                                </button>
                              )}

                              {/* Prominent WhatsApp Customer Button */}
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm transition-colors shrink-0"
                                title="Open WhatsApp chat with pre-filled order receipt & dispatch updates"
                              >
                                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                                <span>WhatsApp Customer</span>
                              </a>

                              {/* Tracking Updater */}
                              <button
                                onClick={() => {
                                  const trk = prompt(
                                    "Enter Courier AWB / Tracking Code:",
                                    order.trackingNumber || ""
                                  );
                                  if (trk !== null) {
                                    const cour = prompt(
                                      "Enter Courier Name (BlueDart, Delhivery, etc.):",
                                      order.courierName || "BlueDart Express"
                                    );
                                    handleUpdateTracking(order.id, trk, cour || "BlueDart Express");
                                  }
                                }}
                                className="p-2 rounded-[6px] bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                                title="Add/Edit Courier Tracking"
                              >
                                <Truck className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS, PRICING, STOCK & IMAGE UPLOAD */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#211612]">
                  Pickle Catalog & Stock
                </h3>
                <p className="text-xs text-[#3D2C24]/60">
                  Update unit prices, modify stock inventory, and upload new bottle images.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-2xl bg-[#FDFBF7] border border-[#E8DEC8] text-xs focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProdName("");
                    setProdSubtitle("");
                    setProdDescription("");
                    setProdPrice250(299);
                    setProdPrice500(549);
                    setProdPrice1kg(999);
                    setProdStock(50);
                    setProdImage("/images/products/mushroom-mela-front.jpg");
                    setShowProductModal(true);
                  }}
                  className="px-5 py-2.5 rounded-[6px] bg-[#211612] hover:bg-[#1C130E] text-[#FAF6EE] border border-[#211612] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#C89B3C]" />
                  <span>Add New Pickle</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#FDFBF7] rounded-[6px] border border-[#E8DEC8] shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square bg-[#FAF6EE]">
                      <Image
                        src={p.image || "/images/products/mushroom-mela-front.jpg"}
                        alt={p.name}
                        fill
                        className="object-contain p-2"
                      />
                      <span className="absolute top-3 left-3 bg-[#1C130E] text-[#FAF6EE] text-[10px] font-bold px-2.5 py-1 rounded-[4px] shadow-sm border border-[#C89B3C]/40">
                        Stock: {p.stockCount} jars
                      </span>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <span className="text-[10px] font-bold text-[#C89B3C] bg-[#1C130E] px-2.5 py-0.5 rounded-[4px] border border-[#C89B3C]/30">
                        {p.flavour}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#211612] line-clamp-1 leading-snug">
                        {p.name}
                      </h4>

                      {/* Prices for sizes */}
                      <div className="space-y-1 pt-1 text-xs text-[#3D2C24]/80 bg-[#FAF6EE] p-3 rounded-[6px] border border-[#E8DEC8]">
                        {p.sizes?.map((s) => (
                          <div key={s.size} className="flex justify-between items-center">
                            <span className="font-medium">{s.size}:</span>
                            <span className="font-serif font-extrabold text-[#211612]">
                              ₹{s.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-[#E8DEC8] pt-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="py-2.5 rounded-[6px] bg-[#FAF6EE] hover:bg-[#E8DEC8] text-[#211612] text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-[#E8DEC8]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit & Stock</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="py-2.5 rounded-[6px] bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-red-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: VIEW ORDER DETAILS WITH WHATSAPP DISPATCH */}
        {selectedOrderForView && (
          <div className="fixed inset-0 z-50 bg-[#1C130E]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#FDFBF7] rounded-[6px] max-w-xl w-full p-6 sm:p-8 space-y-6 border border-[#E8DEC8] shadow-2xl relative my-8">
              <button
                onClick={() => setSelectedOrderForView(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between pb-4 border-b border-[#E8DEC8]">
                <div>
                  <span className="text-xs font-bold text-[#A87B28] uppercase tracking-wider font-mono">
                    Order Reference
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#211612]">
                    #{selectedOrderForView.orderNumber}
                  </h3>
                </div>
                <span className="text-xs font-bold bg-[#FAF6EE] text-[#211612] px-3 py-1 rounded-[4px] border border-[#E8DEC8]">
                  {selectedOrderForView.orderStatus}
                </span>
              </div>

              {/* Customer summary */}
              <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E8DEC8] text-xs space-y-1.5">
                <p>
                  <strong>Customer:</strong> {selectedOrderForView.customerName}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrderForView.phone}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrderForView.email}
                </p>
                <p>
                  <strong>Address:</strong> {selectedOrderForView.address},{" "}
                  {selectedOrderForView.city} - {selectedOrderForView.pincode}
                </p>
                <p>
                  <strong>Payment:</strong> {selectedOrderForView.paymentMethod} (
                  {selectedOrderForView.paymentStatus})
                </p>
                {selectedOrderForView.utr && (
                  <p className="font-mono text-[#A87B28] font-bold">
                    <strong>Transaction UTR:</strong> {selectedOrderForView.utr}
                  </p>
                )}
              </div>

              {/* Items */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#211612] uppercase tracking-wider">
                  Ordered Jars:
                </h4>
                <div className="space-y-2">
                  {selectedOrderForView.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8]"
                    >
                      <div>
                        <span className="font-bold text-[#211612]">{item.name}</span>
                        <span className="text-[#3D2C24]/60 block text-[11px]">
                          Weight: {item.size} • Quantity: {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-[#211612]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mark as Paid Action if not yet Paid */}
              {selectedOrderForView.paymentStatus !== "Paid" && (
                <div className="pt-2">
                  <button
                    onClick={() => handleMarkAsPaid(selectedOrderForView.id)}
                    className="w-full py-3 px-6 rounded-[6px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Mark Payment as Paid</span>
                  </button>
                </div>
              )}

              {/* Pre-filled WhatsApp button */}
              <div className="pt-1">
                <a
                  href={`https://wa.me/91${selectedOrderForView.phone.replace(
                    /\D/g,
                    ""
                  )}?text=${encodeURIComponent(
                    getWhatsAppCustomerMessage(selectedOrderForView)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-[6px] bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp with Pre-filled Order Update</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT WITH IMAGE UPLOAD */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 bg-[#1C130E]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#FDFBF7] rounded-[6px] max-w-lg w-full p-6 sm:p-8 space-y-5 border border-[#E8DEC8] shadow-2xl relative my-8">
              <button
                onClick={() => setShowProductModal(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#211612]">
                  {editingProduct ? "Edit Pickle & Adjust Pricing" : "Add New Pickle Variety"}
                </h3>
                <p className="text-xs text-[#3D2C24]/60 mt-1">
                  Changes save to Supabase / local storage and reflect on the storefront instantly.
                </p>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                {/* Image Upload & Preview Section */}
                <div className="space-y-2 p-3.5 rounded-[6px] bg-[#FAF6EE] border border-[#E8DEC8]">
                  <label className="font-bold text-[#211612] block">
                    Product Image & Visual
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-[6px] overflow-hidden bg-white border border-[#E8DEC8] shrink-0">
                      <Image
                        src={prodImage}
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#211612] text-[#FAF6EE] border border-[#211612] text-xs font-semibold hover:bg-[#1C130E] shadow-sm">
                        <Upload className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span>Upload New Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[10px] text-[#3D2C24]/60">
                        Select a JPEG/PNG photo from your computer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#211612]">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kashmiri Morel Morchella Mushroom Pickle"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[6px] border border-[#E8DEC8] bg-[#FAF6EE] text-[#211612] focus:outline-none focus:ring-2 focus:ring-[#211612]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#211612]">Short Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Infused with wild mountain spices and raw mustard oil"
                    value={prodSubtitle}
                    onChange={(e) => setProdSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[6px] border border-[#E8DEC8] bg-[#FAF6EE] text-[#211612] focus:outline-none focus:ring-2 focus:ring-[#211612]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#211612]">Flavour</label>
                    <select
                      value={prodFlavour}
                      onChange={(e) => setProdFlavour(e.target.value)}
                      className="w-full px-3 py-2 rounded-[6px] border border-[#E8DEC8] focus:outline-none bg-[#FAF6EE] text-[#211612]"
                    >
                      <option value="Classic Masala">Classic Masala</option>
                      <option value="Garlic">Garlic</option>
                      <option value="Mustard Oil">Mustard Oil</option>
                      <option value="Spicy Red Chilli">Spicy Red Chilli</option>
                      <option value="Wild Herbal">Wild Herbal</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#211612]">Spice Level</label>
                    <select
                      value={prodSpice}
                      onChange={(e) =>
                        setProdSpice(e.target.value as "Mild" | "Medium" | "Hot")
                      }
                      className="w-full px-3 py-2 rounded-[6px] border border-[#E8DEC8] focus:outline-none bg-[#FAF6EE] text-[#211612]"
                    >
                      <option value="Mild">Mild</option>
                      <option value="Medium">Medium</option>
                      <option value="Hot">Hot</option>
                    </select>
                  </div>
                </div>

                {/* Price by Size with Instant Edit */}
                <div className="space-y-1.5 pt-1">
                  <label className="font-bold text-[#211612]">
                    Price by Jar Weight (₹):
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <span className="text-[10px] text-[#3D2C24]/60 font-semibold block mb-0.5">
                        250g Jar Price
                      </span>
                      <input
                        type="number"
                        required
                        value={prodPrice250}
                        onChange={(e) => setProdPrice250(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#E8DEC8] bg-[#FAF6EE] font-bold font-serif text-[#211612]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#3D2C24]/60 font-semibold block mb-0.5">
                        500g Jar Price
                      </span>
                      <input
                        type="number"
                        required
                        value={prodPrice500}
                        onChange={(e) => setProdPrice500(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#E8DEC8] bg-[#FAF6EE] font-bold font-serif text-[#211612]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#3D2C24]/60 font-semibold block mb-0.5">
                        1kg Jar Price
                      </span>
                      <input
                        type="number"
                        required
                        value={prodPrice1kg}
                        onChange={(e) => setProdPrice1kg(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#E8DEC8] bg-[#FAF6EE] font-bold font-serif text-[#211612]"
                      />
                    </div>
                  </div>
                </div>

                {/* Available Inventory (Stock) */}
                <div className="space-y-1">
                  <label className="font-bold text-[#211612]">
                    Inventory Count (Available Jars)
                  </label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-[6px] border border-[#E8DEC8] bg-[#FAF6EE] text-[#211612]"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2.5 border-t border-[#E8DEC8]">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2.5 rounded-[6px] border border-[#E8DEC8] text-stone-600 font-bold hover:bg-[#FAF6EE]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-[6px] bg-[#211612] hover:bg-[#1C130E] text-[#FAF6EE] border border-[#211612] font-bold shadow-sm transition-colors"
                  >
                    Save Pickle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
