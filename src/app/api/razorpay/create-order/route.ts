import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  const isConfigured = Boolean(
    keyId &&
    keySecret &&
    !keyId.includes("YourTestKeyIdHere") &&
    !keySecret.includes("YourRazorpaySecretKeyHere") &&
    keyId.trim() !== "" &&
    keySecret.trim() !== ""
  );

  return NextResponse.json({
    configured: isConfigured,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const amountInRupees = Number(body.amount) || 0;
    const amountInPaise = Math.round(amountInRupees * 100);
    const receipt = body.receipt || `rcpt_${Date.now()}`;
    const currency = body.currency || "INR";

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if real Razorpay API keys are configured
    if (
      !keyId ||
      !keySecret ||
      keyId.includes("YourTestKeyIdHere") ||
      keySecret.includes("YourRazorpaySecretKeyHere") ||
      keyId.trim() === "" ||
      keySecret.trim() === ""
    ) {
      return NextResponse.json(
        { success: false, error: "Razorpay payment gateway keys are not configured" },
        { status: 400 }
      );
    }

    const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: currency,
        receipt: receipt,
        payment_capture: 1,
        notes: {
          store: "Akhil Foods Artisanal Pickles",
          receipt: receipt,
        },
      }),
    });

    const data = await res.json();
    if (res.ok && data?.id) {
      return NextResponse.json({
        success: true,
        orderId: data.id,
        amount: data.amount,
        currency: data.currency,
        keyId: keyId,
      });
    }

    return NextResponse.json(
      { success: false, error: data?.error?.description || "Razorpay rejected order creation" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create Razorpay payment order" },
      { status: 500 }
    );
  }
}
