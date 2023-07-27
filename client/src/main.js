import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";

// import './assets/main.css'

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(router);
app.use(pinia);

app.use(vue3GoogleLogin, {
    clientId:
      "1042021676188-icmio6fvb70lr76iijbnsnnimjt9qm91.apps.googleusercontent.com",
  });

app.mount("#app")
