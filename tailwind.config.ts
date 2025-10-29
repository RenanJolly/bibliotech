import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Nova paleta de cores marrom/bege
        'color1': '#f7ead9', // Bege muito claro
        'color2': '#e1d2a9', // Bege claro
        'color3': '#88b499', // Verde musgo
        'color4': '#619885', // Verde escuro
        'color5': '#67594e', // Marrom escuro
        // Variações para gradientes
        'bege-principal': '#f7ead9',
        'bege-claro': '#e1d2a9',
        'verde-musgo': '#88b499',
        'verde-escuro': '#619885',
        'marrom-escuro': '#67594e',
      },
    },
  },
  plugins: [],
};

export default config;

