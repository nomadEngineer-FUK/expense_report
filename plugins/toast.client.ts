import Toast, { POSITION } from "vue-toastification";
import { defineNuxtPlugin } from "#app";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        position: POSITION.TOP_RIGHT,
    });
});
