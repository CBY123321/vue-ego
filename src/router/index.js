import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout/index.vue";
import Login from "../views/Login/login.vue";
import Home from "../views/Home/index.vue";

const Goods = () => import("../views/Goods/index.vue");
const Params = () => import("../views/Params/index.vue");
const Advert = () => import("../views/Advert/index.vue");
const Order = () => import("../views/Order/index.vue");
const AddGood = () => import("../views/Goods/addGood.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/goods",
        name: "Goods",
        component: Goods,
      },
      {
        path: "/add-good",
        name: "addGood",
        component: AddGood,
      },
      {
        path: "/params",
        name: "Params",
        component: Params,
      },
      {
        path: "/advert",
        name: "Advert",
        component: Advert,
      },
      {
        path: "/order",
        name: "Order",
        component: Order,
        redirect: "/order/order-list",
        children: [
          {
            path: "order-list",
            component: () => import("../views/Order/OrderList/index.vue"),
          },
          {
            path: "order-back",
            component: () => import("../views/Order/OrderBack/index.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
