import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Homepage },
  { path: "/activity", name: "Activity", component: Homepage },
  { path: "/library", name: "library", component: Homepage },
  { path: "/security", name: "security", component: Homepage },
  { path: "/schedules", name: "schedules", component: Homepage },
  { path: "/payouts", name: "payouts", component: Homepage },
  { path: "/settings", name: "settings", component: Homepage },
  { path: "/transactions", name: "transactions", component: Homepage },
  { path: "/schedule", name: "schedule", component: Homepage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
