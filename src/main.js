import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/reset.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;

let user = localStorage.getItem("user");
if (user) {
  user = JSON.parse(user);
  store.commit("user/getInfo", user);
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
