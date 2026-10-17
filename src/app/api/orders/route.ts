import { NextRequest, NextResponse } from "next/server";
import { Order, OrderStatus } from "@/lib/types";
import { getLocalOrders, addLocalOrder, updateLocalOrderStatus } from "@/lib/store";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { sendOrderNotificationEmail } from "@/lib/email";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (isSupabaseConfigured && supabase) {
      let req = supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (query) {
        req = req.or(`order_number.ilike.%${query}%,phone.ilike.%${query}%,email.ilike.%${query}%`);
      }
      const { data, error } = await req;
      if (!error && data) {
        return NextResponse.json({ success: true, orders: data });
      }
    }

    const local = getLocalOrders();
    if (!query) {
      return NextResponse.json({ success: true, orders: local });
    }

    const q = query.toLowerCase();
    const filtered = local.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.email.toLowerCase().includes(q)
    );
    return NextResponse.json({ success: true, orders: filtered });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const orderId = `ord-${Date.now()}`;
    const orderNumber = `AF-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderNumber,
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      landmark: body.landmark || "",
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      items: body.items,
      subtotal: body.subtotal,
      shipping: body.shipping,
      discount: body.discount || 0,
      couponCode: body.couponCode || "",
      total: body.total,
      paymentMethod: body.paymentMethod,
      paymentStatus: body.paymentMethod.includes("Cash on Delivery") ? "Pending" : "Paid",
      orderStatus: "New",
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
    };

    // 1. Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("orders").insert([
          {
            id: newOrder.id,
            order_number: newOrder.orderNumber,
            customer_name: newOrder.customerName,
            email: newOrder.email,
            phone: newOrder.phone,
            address: newOrder.address,
            landmark: newOrder.landmark,
            city: newOrder.city,
            state: newOrder.state,
            pincode: newOrder.pincode,
            items: newOrder.items,
            subtotal: newOrder.subtotal,
            shipping: newOrder.shipping,
            discount: newOrder.discount,
            coupon_code: newOrder.couponCode,
            total: newOrder.total,
            payment_method: newOrder.paymentMethod,
            payment_status: newOrder.paymentStatus,
            order_status: newOrder.orderStatus,
            created_at: newOrder.createdAt,
          },
        ]);
      } catch (err) {
        console.warn("Supabase order insert warning:", err);
      }
    }

    // 2. Save to local persistence
    addLocalOrder(newOrder);

    // 3. Dispatch Email Notification with full order details
    const emailResult = await sendOrderNotificationEmail(newOrder);

    return NextResponse.json({
      success: true,
      order: newOrder,
      emailNotification: emailResult,
    }, { status: 201 });
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { orderId, orderStatus, trackingNumber, courierName } = await request.json();

    if (!orderId || !orderStatus) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from("orders")
        .update({
          order_status: orderStatus,
          tracking_number: trackingNumber,
          courier_name: courierName,
        })
        .eq("id", orderId);
    }

    const updated = updateLocalOrderStatus(orderId, orderStatus as OrderStatus, trackingNumber, courierName);

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Orders PATCH error:", error);
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 });
  }
}
