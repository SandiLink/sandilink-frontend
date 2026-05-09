/**
 * SandiLink / One Sandi — Brand theme constants
 *
 * Single source of truth for brand colors, logos, and theme metadata.
 * Import this wherever you need brand values in JS (components, charts, etc.).
 * CSS custom properties live in globals.css and stay in sync with these values.
 */

export const brand = {
  name: "SandiLink",
  company: "One Sandi",
  description: "Healthcare marketplace platform",
};

export const logos = {
  light: "/logo-2-2.png",
  dark: "/logo-1.png",
  sandiLink: "/logo-3.jpeg",
};

export const colors = {
  // Primary teal/cyan — from SandiLink logo gradient midpoint
  primary: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    DEFAULT: "#0891b2",
  },

  // Navy — from One Sandi logo
  navy: {
    50: "#eff3f8",
    100: "#d4dce8",
    200: "#a9b9d1",
    300: "#7e96ba",
    400: "#5373a3",
    500: "#2d5287",
    600: "#1e3a5f",
    700: "#162c48",
    800: "#0f1e30",
    900: "#071019",
    DEFAULT: "#1e3a5f",
  },

  // Accent cyan — bright top of SandiLink gradient
  cyan: {
    light: "#22d3ee",
    DEFAULT: "#06b6d4",
    dark: "#0e7490",
  },
};

export const chartColors = [
  colors.primary[600],
  colors.primary[400],
  colors.navy[500],
  colors.navy[300],
  colors.primary[800],
];
