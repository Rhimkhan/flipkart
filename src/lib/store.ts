import { Product, Order, OrderStatus } from "./types";
import { INITIAL_PRODUCTS } from "./data";

const LOCAL_STORAGE_PRODUCTS_KEY = "akhil_foods_products_v1";
const LOCAL_STORAGE_ORDERS_KEY = "akhil_foods_orders_v1";

// Helper for initial seed orders so Admin has realistic live data to view and update
const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "AF-8921",
    customerName: "Rohan Malhotra",
    email: "rohan.m@gmail.com",
    phone: "9810123456",
    address: "B-42, Gulmohar Enclave, Near Market",
    landmark: "Behind Central Park",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110049",
    items: [
      {
        productId: "prod-1",
        name: "Classic Masala Oyster Mushroom Pickle",
        size: "500g",
        price: 549,
        quantity: 1,
        image: "/images/classic-masala.jpg",
      },
      {
        productId: "prod-2",
        name: "Slow-Roasted Garlic Shiitake Mushroom Pickle",
        size: "250g",
        price: 349,
        quantity: 1,
        image: "/images/garlic-shiitake.jpg",
      },
    ],
    subtotal: 898,
    shipping: 0,
    discount: 50,
    couponCode: "AKHIL10",
    total: 848,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    orderStatus: "Packed",
    trackingNumber: "BD982736451IN",
    courierName: "BlueDart Express",
    createdAt: "2026-10-16T12:00:00.000Z",
  },
  {
    id: "ord-1002",
    orderNumber: "AF-8922",
    customerName: "Ananya Iyer",
    email: "ananya.iyer@outlook.com",
    phone: "9988776655",
    address: "Flat 402, Prestige Hermitage, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    items: [
      {
        productId: "prod-4",
        name: "Spicy Red Chilli Pahadi Mushroom Pickle",
        size: "500g",
        price: 579,
        quantity: 2,
        image: "/images/spicy-chilli.jpg",
      },
    ],
    subtotal: 1158,
    shipping: 0,
    discount: 0,
    total: 1158,
    paymentMethod: "Razorpay Online (UPI / Cards / Netbanking)",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    trackingNumber: "DEL77889901IN",
    courierName: "Delhivery Air",
    createdAt: "2026-10-15T15:30:00.000Z",
  },
];

// Server-side in-memory persistence when window is undefined
let serverMemoryOrders: Order[] = [...INITIAL_ORDERS];
let serverMemoryProducts: Product[] = [...INITIAL_PRODUCTS];

export function getLocalProducts(): Product[] {
  if (typeof window === "undefined") return serverMemoryProducts;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading local products:", err);
    return serverMemoryProducts;
  }
}

export function saveLocalProducts(products: Product[]): void {
  if (typeof window === "undefined") {
    serverMemoryProducts = products;
    return;
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
  } catch (err) {
    console.error("Error saving local products:", err);
  }
}

export function getLocalOrders(): Order[] {
  if (typeof window === "undefined") return serverMemoryOrders;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading local orders:", err);
    return serverMemoryOrders;
  }
}

export function saveLocalOrders(orders: Order[]): void {
  if (typeof window === "undefined") {
    serverMemoryOrders = orders;
    return;
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error("Error saving local orders:", err);
  }
}

export function addLocalOrder(newOrder: Order): Order {
  const current = getLocalOrders();
  const updated = [newOrder, ...current];
  saveLocalOrders(updated);
  return newOrder;
}

export function updateLocalOrderStatus(orderId: string, status: OrderStatus, trackingNumber?: string, courierName?: string): Order | null {
  const current = getLocalOrders();
  const index = current.findIndex((o) => o.id === orderId);
  if (index === -1) return null;
  const updatedOrder = {
    ...current[index],
    orderStatus: status,
    ...(trackingNumber ? { trackingNumber } : {}),
    ...(courierName ? { courierName } : {}),
  };
  current[index] = updatedOrder;
  saveLocalOrders(current);
  return updatedOrder;
}

export function findOrderByNumberOrPhone(query: string): Order[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const orders = getLocalOrders();
  return orders.filter(
    (o) =>
      o.orderNumber.toLowerCase() === q ||
      o.id.toLowerCase() === q ||
      o.phone.replace(/\D/g, "").includes(q.replace(/\D/g, "")) ||
      o.email.toLowerCase() === q
  );
}
