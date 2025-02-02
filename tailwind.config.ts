import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "custom-1": "hsl(0deg 0% 3%)",
        "custom-2": "hsl(335deg 30% 5%)",
        "custom-3": "hsl(334deg 38% 6%)",
        "custom-4": "hsl(333deg 42% 7%)",
        "custom-5": "hsl(332deg 43% 9%)",
        "custom-6": "hsl(332deg 45% 10%)",
        "custom-7": "hsl(332deg 49% 10%)",
        "custom-8": "hsl(331deg 54% 11%)",
        "custom-9": "hsl(330deg 59% 12%)",
        "custom-10": "hsl(329deg 64% 13%)",
        "custom-11": "hsl(329deg 69% 14%)",
        "custom-12": "hsl(329deg 73% 14%)",
        "custom-13": "0hsl(330deg 75% 14%)",
        "custom-14": "hsl(331deg 78% 14%)",
        "custom-15": "hsl(332deg 80% 14%)",
        "custom-16": "hsl(333deg 83% 14%)",
        "custom-17": "hsl(334deg 85% 14%)",
        "custom-18": "hsl(335deg 87% 14%)",
        "custom-19": "hsl(336deg 90% 15%)",
        "custom-20": "hsl(337deg 92% 15%)",
        "custom-21": "hsl(337deg 95% 15%)",
        "custom-22": "hsl(338deg 97% 15%)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
