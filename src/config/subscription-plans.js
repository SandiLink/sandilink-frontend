export const PROVIDER_PLANS = [
  {
    slug: "starter",
    name: "Starter",
    tagline: "Solo professionals starting out",
    monthly: 29,
    annual: 290,
    annualSavings: "Save 17%",
    highlight: false,
    features: [
      "Public provider profile",
      "Up to 25 active bookings / month",
      "1 service category",
      "Standard messaging & calendar",
      "Email support",
    ],
  },
  {
    slug: "professional",
    name: "Professional",
    tagline: "Growing practices that need more reach",
    monthly: 59,
    annual: 590,
    annualSavings: "Save 17%",
    highlight: true,
    features: [
      "Everything in Starter",
      "Unlimited active bookings",
      "Up to 5 service categories",
      "Priority directory placement",
      "Profile analytics & insights",
      "Priority email support",
    ],
  },
  {
    slug: "premium",
    name: "Premium",
    tagline: "Established practices and clinics",
    monthly: 99,
    annual: 990,
    annualSavings: "Save 17%",
    highlight: false,
    features: [
      "Everything in Professional",
      "Unlimited service categories",
      "Featured directory placement",
      "Multi-language profile content",
      "Custom service packages",
      "Dedicated account manager",
    ],
  },
];

export function getPlan(slug) {
  return PROVIDER_PLANS.find((p) => p.slug === slug);
}

export const PAYMENT_METHODS = {
  phase1: [
    { id: "stripe-card", gatewayId: "stripe", name: "Credit / Debit Card", provider: "Stripe", note: "Visa, Mastercard, Amex, Discover" },
    { id: "apple-pay", gatewayId: "stripe", name: "Apple Pay", provider: "Stripe", note: "One-tap on supported devices" },
    { id: "google-pay", gatewayId: "stripe", name: "Google Pay", provider: "Stripe", note: "One-tap on supported devices" },
    { id: "paypal", gatewayId: "paypal", name: "PayPal", provider: "PayPal", note: "Pay with your PayPal balance or linked account" },
  ],
  phase2: [
    { id: "flutterwave", gatewayId: "flutterwave", name: "Flutterwave", provider: "Flutterwave", note: "Africa & global", region: "Africa" },
    { id: "paystack", gatewayId: "paystack", name: "Paystack", provider: "Paystack", note: "Local cards & bank transfer", region: "West Africa" },
    { id: "mpesa", gatewayId: "mpesa", name: "M-Pesa", provider: "Safaricom", note: "Mobile money", region: "East Africa" },
    { id: "razorpay", gatewayId: "razorpay", name: "Razorpay", provider: "Razorpay", note: "UPI, cards, netbanking", region: "India" },
    { id: "mercadopago", gatewayId: "mercadopago", name: "MercadoPago", provider: "MercadoPago", note: "Local cards & wallets", region: "Latin America" },
  ],
};
