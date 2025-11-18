// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  imports: {
    dirs: ["./apps/services/api/*"],
  },
});
