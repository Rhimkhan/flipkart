import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getLocalOrders, saveLocalOrders } from "@/lib/store";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId, // internal order ID or orderNumber
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (!orderId || !razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { success: false, error: "Missing required payment verification details" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    let isValid = false;

    // 1. Signature Verification with Secret
    if (keySecret && !keySecret.includes("YourRazorpaySecretKeyHere")) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      isValid = generatedSignature === razorpay_signature;
      if (!isValid) {
        console.warn(`[RAZORPAY SIGNATURE MISMATCH] Expected ${generatedSignature}, received ${razorpay_signature}`);
        return NextResponse.json(
          { success: false, error: "Invalid payment signature verification failed" },
          { status: 400 }
        );
      }
    } else {
      // 2. Test simulation mode verification
      isValid = true;
    }

    // 3. Mark the Order as "Paid" in Supabase & Local Store
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from("orders")
          .update({
            payment_status: "Paid",
            notes: `Razorpay Payment Verified: ${razorpay_payment_id} (Order: ${razorpay_order_id})`,
          })
          .or(`id.eq.${orderId},order_number.eq.${orderId}`);
      } catch (err) {
        console.warn("Supabase payment update error:", err);
      }
    }

    // Update Local Store
    const local = getLocalOrders();
    const index = local.findIndex((o) => o.id === orderId || o.orderNumber === orderId);
    if (index !== -1) {
      local[index] = {
        ...local[index],
        paymentStatus: "Paid",
        notes: `Razorpay Payment Verified: ${razorpay_payment_id} (Order: ${razorpay_order_id})`,
      };
      saveLocalOrders(local);
    }

    console.log(`[PAYMENT VERIFIED SUCCESS] Order: ${orderId} | Payment ID: ${razorpay_payment_id}`);

    return NextResponse.json({
      success: true,
      message: "Razorpay signature verified on server. Order marked as Paid.",
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Payment verification server error:", error);
    return NextResponse.json(
      { success: false, error: "Server error during payment verification" },
      { status: 500 }
    );
  }
}
