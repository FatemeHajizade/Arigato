import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Register from "../components/Register";
import EditProfile from "../views/EditProfile";
import NewProject from "../views/NewProject";
import Profile from "../views/Profile";
import Login from "../components/Login";
import SendSuggestion from "../views/SendSuggestion";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/signin",
    name: "signin",
    component: Register
  },
   {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile/edit",
    name: "editprofile",
    component: EditProfile
  },
    {
    path: "/profile/:id",
    name: "profile",
    component: Profile
  },
  {
    path: "/newproject",
    name: "newproject",
    component: NewProject
  },
  {
    path: "/projects/:id/sendsuggestion",
    name: "sendsuggestion",
    component: SendSuggestion
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
