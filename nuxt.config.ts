import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@nuxtjs/google-fonts"],
  supabase: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/",
      exclude: ["/*"],
    },
  },
  public: {
    jawgMapsApiKey: process.env.JAWG_MAPS_API_KEY,
  },
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
  },
  app: {
    head: {
      title: "Store Locator",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Find stores near you with our interactive store locator",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      jawgMapsApiKey: process.env.JAWG_MAPS_API_KEY,
    },
  },
  plugins: ["~/plugins/fontawesome.ts"],
});
