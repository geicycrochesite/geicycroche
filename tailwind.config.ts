import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme Colors
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
          card: "var(--color-bg-card)",
          hover: "var(--color-bg-hover)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          muted: "var(--color-text-muted)",
        },
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        error: "var(--color-error)",
        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
        // Admin
        admin: {
          bg: "var(--color-admin-bg)",
          text: "var(--color-admin-text)",
          border: "var(--color-admin-border)",
        },
      },
    },
  },
  plugins: [typography],
};

export default config;