import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import EditProfile from "../views/EditProfile";
import NewProject from "../views/NewProject";

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
  },
  {
    path: "/newproject",
    name: "newproject",
    component: NewProject
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
