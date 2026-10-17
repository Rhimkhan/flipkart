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
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-4 py-1.5 rounded-full border border-[#EAD075] inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6B352A]" />
            <span>Dedicated Customer Care</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#6B352A]">
            Get In Touch With Our Kitchen
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Have questions about ingredients, bulk family orders, wedding gifting, or courier delivery? We are right here in Solan, HP.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#6B352A] text-[#FFF8E7] p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF1A6]">
                Our Kitchen & Agro Farm
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF8E7]/80 leading-relaxed">
                Visit our organic mushroom cultivation beds and traditional earthen pickling cellars in Solan, the Mushroom Capital of India.
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0 border border-[#FFF1A6]/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFF1A6]">Kitchen & Farm Address</h4>
                    <p className="text-[#FFF8E7]/85 mt-0.5 leading-relaxed">{BRAND.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0 border border-[#FFF1A6]/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFF1A6]">Phone & Direct Care</h4>
                    <a href={TEL_LINK} className="text-[#FFF8E7]/85 hover:text-[#FFF1A6] underline mt-0.5 block text-sm font-semibold">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0 border border-[#FFF1A6]/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFF1A6]">Official Email</h4>
                    <a href={`mailto:${BRAND.email}`} className="text-[#FFF8E7]/85 hover:text-[#FFF1A6] underline mt-0.5 block">
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0 border border-[#FFF1A6]/10">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFF1A6]">Operating Hours</h4>
                    <p className="text-[#FFF8E7]/85 mt-0.5">Mon – Sat: 9:00 AM – 7:00 PM IST (Sun Closed)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Box */}
            <div className="bg-[#4A231B] p-5 rounded-2xl border border-[#FFF1A6]/20 space-y-2.5 text-xs">
              <span className="font-bold text-[#FFF1A6] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Instant WhatsApp Live Desk</span>
              </span>
              <p className="text-[#FFF8E7]/70 text-[11px] leading-relaxed">
                Connect directly with our culinary team. Average response time under 10 minutes.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20ba59] transition-colors shadow-md"
              >
                Chat on WhatsApp (+91 69665 58899)
              </a>
            </div>

            {/* Official Government Registrations & Certification Box */}
            <div className="bg-[#4A231B] p-5 rounded-2xl border border-[#FFF1A6]/20 space-y-3 text-xs">
              <span className="font-bold text-[#FFF1A6] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFF1A6]" />
                <span>Government Registrations</span>
              </span>
              <div className="space-y-2 text-[11px] text-[#FFF8E7]/90 font-mono">
                <div className="bg-[#6B352A]/50 p-2.5 rounded-xl border border-[#FFF1A6]/15">
                  <div className="text-[#FFF1A6] font-bold">FSSAI Food Safety Registration</div>
                  <div className="text-white font-semibold text-xs mt-0.5">No. {FSSAI_NUMBER}</div>
                  <div className="text-[10px] text-[#FFF8E7]/70 mt-0.5">Valid till: {FSSAI_VALIDITY}</div>
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
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#6B352A]/15 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#6B352A]">
              Send Us an Official Message
            </h2>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-3xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold">Message Received!</h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
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
                    className="px-6 py-2.5 rounded-full bg-[#6B352A] text-[#FFF1A6] text-xs font-bold hover:bg-[#4A231B] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#2B1B17]">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#2B1B17]">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 6966558899"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#2B1B17]">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#2B1B17]">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30"
                  >
                    <option value="Order Inquiry">Order Inquiry / Delivery Status Tracking</option>
                    <option value="Bulk Order">Bulk Family / Wedding Gifting / Corporate Hampers</option>
                    <option value="Recipe & Ingredients">Recipe, Spices & Clay Fermentation Question</option>
                    <option value="Farm Visit">Solan Mushroom Agro Farm & Kitchen Tour</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#2B1B17]">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you would like to know or request..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A] bg-[#FFFBEF]/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
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
              <h3 className="font-serif text-2xl font-bold text-[#6B352A]">
                Locate Us in Solan (Mushroom City of India)
              </h3>
              <p className="text-xs text-stone-600">
                Solan, Himachal Pradesh 173212 &bull; Near Himalayan Pine Forests
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Solan,+Himachal+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#6B352A]/20 text-[#6B352A] text-xs font-bold hover:bg-[#FFF8E7] transition-colors shadow-sm self-start"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div className="w-full h-96 rounded-3xl overflow-hidden border-2 border-[#6B352A]/15 shadow-lg bg-stone-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54832.0831627993!2d77.06943896066228!3d30.908351586790906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f8407ee2ff5a9%3A0xc3ce703ec4c8bdf1!2sSolan%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Akhil Foods Solan Himachal Pradesh Farm Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
