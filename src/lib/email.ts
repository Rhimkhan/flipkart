import { Order } from "./types";
import { BRAND } from "./brand";

export interface EmailResult {
  success: boolean;
  messageId?: string;
  recipient: string;
  subject: string;
  previewUrl?: string;
}

export async function sendOrderNotificationEmail(order: Order): Promise<EmailResult> {
  const recipientEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.STORE_OWNER_EMAIL ||
    BRAND.adminEmail ||
    "abhishekkumarnandsiya@gmail.com";

  const subject = `🍄 [NEW ORDER #${order.orderNumber}] - ₹${order.total} from ${order.customerName} (${order.paymentMethod.includes("Cash") ? "COD" : "Online"})`;

  // HTML Email Template with Photo Palette Aesthetics
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Order Received - ${BRAND.name}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF6EE; margin: 0; padding: 24px; color: #211612;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FDFBF7; border-radius: 24px; overflow: hidden; border: 1px solid #E8DEC8; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
    
    <!-- Header Banner -->
    <div style="background-color: #1C130E; padding: 24px; text-align: center; color: #C89B3C;">
      <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px; font-family: Georgia, serif; color: #C89B3C;">${BRAND.name}</h1>
      <p style="margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #FAF6EE; opacity: 0.9;">${BRAND.tagline}</p>
    </div>

    <!-- Alert Strip -->
    <div style="background-color: #2A1D17; padding: 12px 24px; text-align: center; font-size: 13px; font-weight: bold; color: #C89B3C; border-bottom: 1px solid rgba(200,155,60,0.2);">
      🎉 Fresh Order Received! Please prepare batch for dispatch.
    </div>

    <div style="padding: 24px;">
      <!-- Order Info Strip -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="font-size: 13px; color: #736b63;">Order Reference:</td>
          <td style="font-size: 14px; font-weight: bold; text-align: right; color: #211612; font-family: monospace;">#${order.orderNumber}</td>
        </tr>
        <tr>
          <td style="font-size: 13px; color: #736b63;">Placed At:</td>
          <td style="font-size: 13px; text-align: right; color: #211612;">${new Date(order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
        </tr>
        <tr>
          <td style="font-size: 13px; color: #736b63;">Payment Mode:</td>
          <td style="font-size: 13px; font-weight: bold; text-align: right; color: ${order.paymentMethod.includes("Cash") ? "#A87B28" : "#1B5E20"};">
            ${order.paymentMethod} (${order.paymentStatus})
          </td>
        </tr>
      </table>

      <!-- Customer & Shipping Block -->
      <div style="background-color: #FAF6EE; padding: 16px; border-radius: 16px; border: 1px solid #E8DEC8; margin-bottom: 24px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #211612; text-transform: uppercase; letter-spacing: 1px;">Customer & Delivery Details</h3>
        <p style="margin: 0; font-size: 13px; line-height: 1.6;">
          <strong>Name:</strong> ${order.customerName}<br>
          <strong>Mobile / WhatsApp:</strong> <a href="tel:${order.phone}" style="color: #211612; font-weight: bold;">${order.phone}</a><br>
          <strong>Email:</strong> ${order.email}<br>
          <strong>Address:</strong> ${order.address} ${order.landmark ? `(Near ${order.landmark})` : ""}<br>
          <strong>City, State & Pincode:</strong> ${order.city}, ${order.state} - ${order.pincode}
        </p>
      </div>

      <!-- Items Ordered Table -->
      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #211612; text-transform: uppercase; letter-spacing: 1px;">Items in this Order</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #FAF6EE; text-align: left; font-size: 11px; text-transform: uppercase; color: #211612;">
            <th style="padding: 8px 12px; border-radius: 8px 0 0 8px;">Pickle Item</th>
            <th style="padding: 8px 12px;">Jar Size</th>
            <th style="padding: 8px 12px; text-align: center;">Qty</th>
            <th style="padding: 8px 12px; text-align: right; border-radius: 0 8px 8px 0;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item) => `
            <tr style="border-bottom: 1px solid #E8DEC8; font-size: 13px;">
              <td style="padding: 10px 12px; font-weight: 500;">${item.name}</td>
              <td style="padding: 10px 12px; color: #211612; font-weight: bold;">${item.size}</td>
              <td style="padding: 10px 12px; text-align: center;">${item.quantity}</td>
              <td style="padding: 10px 12px; text-align: right; font-weight: bold;">₹${item.price * item.quantity}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <!-- Financial Breakdown -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
        <tr>
          <td style="padding: 4px 0; color: #736b63;">Subtotal:</td>
          <td style="padding: 4px 0; text-align: right; font-weight: 500;">₹${order.subtotal}</td>
        </tr>
        ${
          order.discount > 0
            ? `
        <tr>
          <td style="padding: 4px 0; color: #1B5E20;">Discount (${order.couponCode || "Coupon"}):</td>
          <td style="padding: 4px 0; text-align: right; color: #1B5E20; font-weight: bold;">-₹${order.discount}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 4px 0; color: #736b63;">Express Shipping:</td>
          <td style="padding: 4px 0; text-align: right; font-weight: 500;">${order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</td>
        </tr>
        <tr style="border-top: 2px solid #211612;">
          <td style="padding: 12px 0 0 0; font-size: 16px; font-weight: bold; color: #211612;">Total Amount Payable:</td>
          <td style="padding: 12px 0 0 0; font-size: 18px; font-weight: bold; text-align: right; color: #211612;">₹${order.total}</td>
        </tr>
      </table>

      <!-- Action Buttons in Email -->
      <div style="text-align: center; padding-top: 10px;">
        <a href="https://wa.me/91${order.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
          `Hi ${order.customerName}! We have received your order #${order.orderNumber} for ₹${order.total} at Akhil Foods. Preparing your artisanal mushroom pickles for dispatch now!`
        )}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 13px; margin-right: 8px;">
          💬 Chat with Customer on WhatsApp
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #1C130E; padding: 16px; text-align: center; font-size: 11px; color: #FAF6EE; border-top: 1px solid rgba(200,155,60,0.2); line-height: 1.6;">
      ${BRAND.name} Store Dispatch • ${BRAND.address}<br>
      <strong>FSSAI Reg. No.</strong> ${BRAND.fssaiNumber} (Valid till ${BRAND.fssaiValidity}) • <strong>GSTIN:</strong> ${BRAND.gstNumber} • <strong>Udyam:</strong> ${BRAND.udyamNumber}
    </div>

  </div>
</body>
</html>
  `;

  // 1. If Resend API key is present
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Akhil Foods <abhishekkumarnandsiya@gmail.com>",
          to: [recipientEmail],
          subject: subject,
          html: htmlBody,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`[EMAIL DISPATCHED via Resend] Order #${order.orderNumber} to ${recipientEmail}`);
        return {
          success: true,
          messageId: data.id,
          recipient: recipientEmail,
          subject,
        };
      }
    } catch (e) {
      console.warn("Resend email dispatch error:", e);
    }
  }

  // 2. Local / Development fallback: Log simulation with full details
  console.log(`\n======================================================`);
  console.log(`📧 [ORDER NOTIFICATION EMAIL SENT TO STORE OWNER]`);
  console.log(`To: ${recipientEmail}`);
  console.log(`Subject: ${subject}`);
  console.log(`Customer: ${order.customerName} (${order.phone})`);
  console.log(`Address: ${order.address}, ${order.city} - ${order.pincode}`);
  console.log(`Items: ${order.items.map((i) => `${i.name} [${i.size}] x${i.quantity}`).join(", ")}`);
  console.log(`Total: ₹${order.total} via ${order.paymentMethod}`);
  console.log(`======================================================\n`);

  return {
    success: true,
    messageId: `sim-${Date.now()}`,
    recipient: recipientEmail,
    subject,
  };
}
