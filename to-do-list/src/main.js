import Vue from "vue";
import App from "./App.vue";
import "./css/style.css";
import { Quasar, QIcon } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import router from "./router";
import store from "./store";

Vue.use(Quasar, quasarUserOptions);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
