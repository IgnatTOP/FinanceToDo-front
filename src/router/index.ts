import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import registerComponent from "../views/RegisterComponent.vue";
import registerComponentStep from "../views/RegisterComponentStep.vue";
import registerComponentStep2 from "../views/RegisterComponentStep2.vue";
import registerComponentStep3 from "../views/RegisterComponentStep3.vue";
import registerComponentStep4 from "../views/RegisterComponentStep4.vue";
import login_page from "../views/login_page.vue";

const checkToken = () => {
  return localStorage.getItem("access_token") !== null;
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/register",
  },
  {
    path: "/register",
    component: registerComponent,
    beforeEnter: (to, from, next) => {
      if (checkToken()) {
        next("/tabs/tab1");
      } else {
        next();
      }
    },
  },
  {
    name: "step1",
    path: "/register/step/1",
    component: registerComponentStep,
  },
  {
    name: "login",
    path: "/login",
    component: login_page,
  },
  {
    name: "step2",
    path: "/register/step/2",
    component: registerComponentStep2,
  },
  {
    name: "step3",
    path: "/register/step/3",
    component: registerComponentStep3,
  },
  {
    name: "step4",
    path: "/register/step/4",
    component: registerComponentStep4,
  },
  {
    path: "/tabs/",
    component: TabsPage,
    beforeEnter: (to, from, next) => {
      if (checkToken()) {
        next();
      } else {
        next("/register");
      }
    },
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "profile",
        component: () => import("@/views/Tab3Page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
