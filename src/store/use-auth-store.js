import { create } from "zustand";

/**
 * Provider subscription status:
 *   "active"     — paid + in-period; full dashboard access
 *   "pending"    — registered as care-provider, plan not yet chosen
 *   "past_due"   — payment failed; treat like "pending" for gating purposes
 *   "cancelled"  — opted out
 *
 * Default seed is "active" so existing demo navigation keeps working when
 * nobody has explicitly registered. The register flow flips it to "pending"
 * for new care-providers; checkout success flips it back to "active".
 */
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  subscription: { status: "active", plan: "professional", since: null },

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setSubscription: (next) =>
    set((state) => ({
      subscription: { ...state.subscription, ...next },
    })),

  logout: () =>
    set({
      user: null,
      token: null,
      subscription: { status: "active", plan: "professional", since: null },
    }),
}));
