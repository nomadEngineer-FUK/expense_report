// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/global.css'],
  runtimeConfig: {
    public: {
      USE_MOCK: process.env.NUXT_ENV_USE_MOCK || 'false',
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
  imports: {
    dirs: ['composables/**'],
  },
})
