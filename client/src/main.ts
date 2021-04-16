import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import titleMixin from "./mixins/title.mixin";
import "./http/socket.api";

store.dispatch("films/loadMovies").then(() =>
  createApp(App)
    .use(store)
    .use(router)
    .mixin(titleMixin)
    .mount("#app")
);
