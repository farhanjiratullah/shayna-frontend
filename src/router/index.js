import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import Test from "../views/Test.vue";
import Testing from "../views/Testing.vue";
import Product from "../views/Product.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import Success from "../views/Success.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/testing",
    name: "Testing",
    component: Testing,
  },
  {
    path: "/product/:id",
    props: true,
    name: "product",
    component: Product,
  },
  {
    path: "/cart",
    name: "cart",
    component: ShoppingCart,
  },
  {
    path: "/success",
    name: "success",
    component: Success,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
