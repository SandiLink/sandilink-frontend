import { create } from "zustand";
import { persist } from "zustand/middleware";

export const GATEWAY_CATALOG = [
  {
    id: "stripe",
    name: "Stripe",
    phase: 1,
    region: "Global",
    note: "Cards, Apple Pay, Google Pay",
    docsUrl: "https://stripe.com/docs",
    credentialFields: [
      { key: "publishableKey", label: "Publishable Key", secret: false, prefix: "pk_" },
      { key: "secretKey", label: "Secret Key", secret: true, prefix: "sk_" },
    ],
  },
  {
    id: "paypal",
    name: "PayPal",
    phase: 1,
    region: "Global",
    note: "PayPal balance + linked accounts",
    docsUrl: "https://developer.paypal.com",
    credentialFields: [
      { key: "clientId", label: "Client ID", secret: false },
      { key: "clientSecret", label: "Client Secret", secret: true },
    ],
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    phase: 2,
    region: "Africa & global",
    note: "Africa-first, supports global cards",
    docsUrl: "https://developer.flutterwave.com",
    credentialFields: [
      { key: "publicKey", label: "Public Key", secret: false, prefix: "FLWPUBK_" },
      { key: "secretKey", label: "Secret Key", secret: true, prefix: "FLWSECK_" },
      { key: "encryptionKey", label: "Encryption Key", secret: true },
    ],
  },
  {
    id: "paystack",
    name: "Paystack",
    phase: 2,
    region: "West Africa",
    note: "Local cards & bank transfer",
    docsUrl: "https://paystack.com/docs",
    credentialFields: [
      { key: "publicKey", label: "Public Key", secret: false, prefix: "pk_" },
      { key: "secretKey", label: "Secret Key", secret: true, prefix: "sk_" },
    ],
  },
  {
    id: "mpesa",
    name: "M-Pesa",
    phase: 2,
    region: "East Africa",
    note: "Mobile money via Safaricom Daraja API",
    docsUrl: "https://developer.safaricom.co.ke",
    credentialFields: [
      { key: "consumerKey", label: "Consumer Key", secret: false },
      { key: "consumerSecret", label: "Consumer Secret", secret: true },
      { key: "shortCode", label: "Short Code", secret: false },
      { key: "passkey", label: "Pass Key", secret: true },
    ],
  },
  {
    id: "razorpay",
    name: "Razorpay",
    phase: 2,
    region: "India",
    note: "UPI, cards, netbanking",
    docsUrl: "https://razorpay.com/docs",
    credentialFields: [
      { key: "keyId", label: "Key ID", secret: false, prefix: "rzp_" },
      { key: "keySecret", label: "Key Secret", secret: true },
    ],
  },
  {
    id: "mercadopago",
    name: "MercadoPago",
    phase: 2,
    region: "Latin America",
    note: "Local cards & wallets",
    docsUrl: "https://www.mercadopago.com/developers",
    credentialFields: [
      { key: "publicKey", label: "Public Key", secret: false, prefix: "APP_USR-" },
      { key: "accessToken", label: "Access Token", secret: true },
    ],
  },
];

function defaultGatewayState(gateway) {
  return {
    enabled: gateway.phase === 1,
    mode: "test",
    credentials: Object.fromEntries(
      gateway.credentialFields.map((f) => [f.key, ""]),
    ),
    webhookUrl: `https://api.sandilink.com/webhooks/${gateway.id}`,
    webhookHealth: "unknown",
    lastEventAt: null,
  };
}

const INITIAL_STATE = Object.fromEntries(
  GATEWAY_CATALOG.map((g) => [g.id, defaultGatewayState(g)]),
);

export const usePaymentGatewayStore = create(
  persist(
    (set, get) => ({
      gateways: INITIAL_STATE,

      setEnabled: (gatewayId, enabled) =>
        set((s) => ({
          gateways: {
            ...s.gateways,
            [gatewayId]: { ...s.gateways[gatewayId], enabled },
          },
        })),

      setMode: (gatewayId, mode) =>
        set((s) => ({
          gateways: {
            ...s.gateways,
            [gatewayId]: { ...s.gateways[gatewayId], mode },
          },
        })),

      setCredential: (gatewayId, fieldKey, value) =>
        set((s) => ({
          gateways: {
            ...s.gateways,
            [gatewayId]: {
              ...s.gateways[gatewayId],
              credentials: {
                ...s.gateways[gatewayId].credentials,
                [fieldKey]: value,
              },
            },
          },
        })),

      setWebhookUrl: (gatewayId, webhookUrl) =>
        set((s) => ({
          gateways: {
            ...s.gateways,
            [gatewayId]: { ...s.gateways[gatewayId], webhookUrl },
          },
        })),

      simulateWebhookEvent: (gatewayId) =>
        set((s) => ({
          gateways: {
            ...s.gateways,
            [gatewayId]: {
              ...s.gateways[gatewayId],
              webhookHealth: "healthy",
              lastEventAt: new Date().toISOString(),
            },
          },
        })),

      reset: (gatewayId) =>
        set((s) => {
          const gateway = GATEWAY_CATALOG.find((g) => g.id === gatewayId);
          if (!gateway) return s;
          return {
            gateways: {
              ...s.gateways,
              [gatewayId]: defaultGatewayState(gateway),
            },
          };
        }),

      getEnabledGatewayIds: () =>
        Object.entries(get().gateways)
          .filter(([, state]) => state.enabled)
          .map(([id]) => id),
    }),
    {
      name: "sandilink-payment-gateways",
      partialize: (state) => ({ gateways: state.gateways }),
    },
  ),
);
