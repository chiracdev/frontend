import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

// Initialize the app
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueSweetalert2);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  theme: "bubble",
});

// Register the EasyDataTable component globally
app.component("EasyDataTable", Vue3EasyDataTable);

// Mount the app
app.mount("#app");
