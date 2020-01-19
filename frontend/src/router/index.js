import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import EditProfile from "../views/EditProfile";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/profile/edit",
    name: "editprofile",
    component: EditProfile
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
