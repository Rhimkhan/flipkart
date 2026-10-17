"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8553F] bg-[#FFF1A6] px-3.5 py-1 rounded-full">
            We are Here For You
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#6B352A]">
            Get In Touch
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Have questions about ingredients, bulk family orders, or custom wedding gifting? Reach out directly to our pickling team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#6B352A] text-[#FFF8E7] p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#FFF1A6]">
                Our Kitchen & Agro Farm
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF8E7]/80 leading-relaxed">
                Visit our organic mushroom cultivation beds and traditional earthen pickling cellars in Solan, HP.
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFF1A6]">Farm Address</h4>
                    <p className="text-[#FFF8E7]/80">{BRAND.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFF1A6]">Phone & Care</h4>
                    <a href={`tel:${BRAND.phone}`} className="hover:text-[#FFF1A6] underline">
                      {BRAND.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFF1A6]">Email</h4>
                    <a href={`mailto:${BRAND.email}`} className="hover:text-[#FFF1A6] underline">
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4A231B] text-[#FFF1A6] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFF1A6]">Kitchen Hours</h4>
                    <p className="text-[#FFF8E7]/80">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Box */}
            <div className="bg-[#4A231B] p-4 rounded-2xl border border-[#FFF1A6]/20 space-y-2 text-xs">
              <span className="font-bold text-[#FFF1A6] flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Instant WhatsApp Help</span>
              </span>
              <p className="text-[#FFF8E7]/70 text-[11px]">Average response time under 10 minutes.</p>
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20Akhil%20Foods!%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20ba59] transition-colors"
              >
                Chat on WhatsApp Now
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#6B352A]/15 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#6B352A]">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-3xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold">Message Sent Successfully!</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Thank you for reaching out to {BRAND.name}. A member of our family team will respond via phone or email within a few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-[#6B352A] text-[#FFF1A6] text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#2B1B17]">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#2B1B17]">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#2B1B17]">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#2B1B17]">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                  >
                    <option value="Order Inquiry">Order Inquiry / Delivery Status</option>
                    <option value="Bulk Order">Bulk Family / Wedding Gifting Order</option>
                    <option value="Recipe & Ingredients">Recipe, Spices & Ingredients Question</option>
                    <option value="Farm Visit">Solan Agro Farm & Kitchen Visit</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#2B1B17]">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#6B352A]/20 focus:outline-none focus:ring-2 focus:ring-[#6B352A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#6B352A] hover:bg-[#4A231B] text-[#FFF1A6] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Sending..." : "Submit Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Interactive Google Map Embed */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#6B352A]">
            Locate Us in Solan (Mushroom City of India)
          </h3>
          <div className="w-full h-80 rounded-3xl overflow-hidden border-2 border-[#6B352A]/15 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54832.0831627993!2d77.06943896066228!3d30.908351586790906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f8407ee2ff5a9%3A0xc3ce703ec4c8bdf1!2sSolan%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Akhil Foods Solan Farm Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
