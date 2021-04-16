import { createStore } from "vuex";
import films from "./films.module";
import cart from "./cart.module";
import auth from "./auth.module";
import alerts from "./alerts.module";

export default createStore({
  modules: { films, cart, auth, alerts },
});
