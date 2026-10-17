import {
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  FSSAI_NUMBER,
  FSSAI_VALIDITY,
  FSSAI_DISPLAY,
  GST_NUMBER,
  UDYAM_NUMBER,
} from "./config";

export const BRAND = {
  name: "AKHIL FOODS",
  shortName: "AKHIL FOODS",
  tagline: "Good Food, Better Life",
  subTagline: "Handcrafted Artisanal Himalayan Mushroom Pickles in Mitti Handi & Cold-Pressed Mustard Oil",
  logo: "/images/akhil-foods-logo.png",
  phone: PHONE_DISPLAY,
  whatsappNumber: WHATSAPP_NUMBER,
  email: "care@akhilfoods.com",
  adminEmail: "orders@akhilfoods.com",
  address: "Akhil Organic Agro Farms, High-Altitude Valley Estate, Solan, Himachal Pradesh 173212, India",
  fssaiNumber: FSSAI_NUMBER,
  fssaiValidity: FSSAI_VALIDITY,
  fssaiLicense: `FSSAI Reg. No. ${FSSAI_NUMBER}`,
  gstNumber: GST_NUMBER,
  udyamNumber: UDYAM_NUMBER,
  socials: {
    instagram: "https://instagram.com/akhilfoods",
    facebook: "https://facebook.com/akhilfoods",
    youtube: "https://youtube.com/@akhilfoods",
  },
  freeShippingThreshold: 699,
  defaultShippingCost: 60,
};
