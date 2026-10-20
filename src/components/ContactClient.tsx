"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock, Sparkles, Navigation, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";
import {
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  TEL_LINK,
  WHATSAPP_DEFAULT_MESSAGE,
  FSSAI_NUMBER,
  FSSAI_VALIDITY,
  GST_NUMBER,
  UDYAM_NUMBER,
} from "@/lib/config";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields (Name, Phone, and Message).");
      return;
    }

    setLoading(true);
    // Simulate contact dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FFFBEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-xl border border-[#EAD075] inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6B352A]" />
            <span>Dedicated Customer Care</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#6B352A]">
            Get In Touch With Our Kitchen
          </h1>
          <p className="text-sm text-stone-600">
            Have questions about ingredients, bulk family orders, wedding gifting, or courier delivery? We are right here in Moth, Jhansi, UP.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#6B352A] text-[#FFF8E7] p-8 sm:p-10 rounded-2xl shadow-xl space-y-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF1A6]">
                Our Kitchen & Workshop
              </h2>
              <p className="text-sm text-[#FFF8E7]/90 leading-relaxed">
                Handcrafting authentic Oyster Mushroom Pickles in Village Nandsiya, Moth, Jhansi, Uttar Pradesh.
              </p>

              <div className="space-y-4 pt-2 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0 border border-[#FFF1A6]/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#FFF1A6] text-sm">Kitchen & Farm Address</h3>
                    <p className="text-[#FFF8E7]/90 mt-0.5 leading-relaxed text-sm">{BRAND.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0 border border-[#FFF1A6]/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#FFF1A6] text-sm">Phone & Direct Care</h3>
                    <a href={TEL_LINK} className="text-[#FFF8E7]/90 hover:text-[#FFF1A6] underline mt-0.5 block text-sm font-semibold">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0 border border-[#FFF1A6]/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#FFF1A6] text-sm">Official Email</h3>
                    <a href={`mailto:${BRAND.email}`} className="text-[#FFF8E7]/90 hover:text-[#FFF1A6] underline mt-0.5 block text-sm">
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0 border border-[#FFF1A6]/10">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#FFF1A6] text-sm">Operating Hours</h3>
                    <p className="text-[#FFF8E7]/90 mt-0.5 text-sm">Mon – Sat: 9:00 AM – 7:00 PM IST (Sun Closed)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Box */}
            <div className="bg-[#4A231B] p-5 rounded-xl border border-[#FFF1A6]/20 space-y-2.5 text-sm">
              <span className="font-bold text-[#FFF1A6] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Instant WhatsApp Live Desk</span>
              </span>
              <p className="text-[#FFF8E7]/80 text-xs leading-relaxed">
                Connect directly with our culinary team. Average response time under 10 minutes.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20ba59] transition-colors shadow-md text-sm"
              >
                Chat on WhatsApp (+91 69665 58899)
              </a>
            </div>

            {/* Official Government Registrations & Certification Box */}
            <div className="bg-[#4A231B] p-5 rounded-xl border border-[#FFF1A6]/20 space-y-3 text-sm">
              <span className="font-bold text-[#FFF1A6] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFF1A6]" />
                <span>Government Registrations</span>
              </span>
              <div className="space-y-2 text-xs text-[#FFF8E7]/90 font-mono">
                <div className="bg-[#6B352A]/50 p-2.5 rounded-xl border border-[#FFF1A6]/15">
                  <div className="text-[#FFF1A6] font-bold">FSSAI Food Safety Registration</div>
                  <div className="text-white font-semibold text-xs mt-0.5">No. {FSSAI_NUMBER}</div>
                  <div className="text-xs text-[#FFF8E7]/80 mt-0.5">Valid till: {FSSAI_VALIDITY}</div>
                </div>
                <div className="bg-[#6B352A]/50 p-2.5 rounded-xl border border-[#FFF1A6]/15">
                  <div className="text-[#FFF1A6] font-bold">GSTIN Certificate</div>
                  <div className="text-white font-semibold text-xs mt-0.5">{GST_NUMBER}</div>
                </div>
                <div className="bg-[#6B352A]/50 p-2.5 rounded-xl border border-[#FFF1A6]/15">
                  <div className="text-[#FFF1A6] font-bold">Udyam MSME Registration</div>
                  <div className="text-white font-semibold text-xs mt-0.5">{UDYAM_NUMBER}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#6B352A]/15 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#6B352A]">
              Send Us an Official Message
            </h2>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold">Message Received!</h3>
                <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to <strong>{BRAND.name}</strong>. A member of our family team will contact you via phone or email within a few hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "Order Inquiry",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#6B352A] text-[#FFF1A6] text-sm font-bold hover:bg-[#4A231B] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#2B1B17]">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30 text-sm text-[#2B1B17]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#2B1B17]">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 6966558899"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30 text-sm text-[#2B1B17]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#2B1B17]">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30 text-sm text-[#2B1B17]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#2B1B17]">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30 text-sm text-[#2B1B17]"
                  >
                    <option value="Order Inquiry">Order Inquiry / Delivery Status Tracking</option>
                    <option value="Bulk Order">Bulk Family / Wedding Gifting / Corporate Hampers</option>
                    <option value="Recipe & Ingredients">Recipe, Spices & Ingredients Question</option>
                    <option value="Production Inquiry">Kitchen & Production Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#2B1B17]">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you would like to know or request..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30 text-sm text-[#2B1B17]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Sending Message..." : "Submit Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Interactive Google Map Embed */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#6B352A]">
                Locate Us in Moth, Jhansi (Uttar Pradesh)
              </h2>
              <p className="text-sm text-stone-600">
                {BRAND.address}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Village+Nandsiya,+Moth,+Jhansi,+Uttar+Pradesh+284303"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#6B352A]/20 text-[#6B352A] text-xs font-bold hover:bg-[#FFF8E7] transition-colors shadow-sm self-start"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div className="w-full h-96 rounded-2xl overflow-hidden border-2 border-[#6B352A]/15 shadow-lg bg-stone-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57545.33405788484!2d78.91924515!3d25.71480115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39775f0a4f5b5f89%3A0x6e2c3a5b06ec9047!2sMoth%2C%20Uttar%20Pradesh%20284303!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AKHIL FOODS Moth Jhansi Uttar Pradesh Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
