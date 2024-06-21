import Login from "./pages/auth/auth.signin.vue";
import Signup from "./pages/auth/auth.signup.vue";
import Activation from "./pages/auth/auth.activation.vue";
import SignupComplete from "./pages/auth/auth.signupComplete.vue";
import ForgotPassword from "./pages/auth/auth.forgotPassword.vue";

import Setup from "./pages/admin/admin.setup.vue";
import Profile from "./pages/admin/admin.profile.vue";
import HelpPage from "./pages/admin/admin.helpPage.vue";
import Settings from "./pages/admin/admin.settings.vue";
import Evacuation from "./pages/admin/admin.evacuation.vue";
import ResetPassword from "./pages/admin/admin.resetPassword.vue";

import Users from "./pages/overview/overview.users.vue";
import Reports from "./pages/overview/overview.reports.vue";
import Locations from "./pages/overview/overview.locations.vue";

import VisitCalendar from "./pages/visit/visit.calendar.vue";
import ConfirmSlot from "./pages/visit/visit.confirmation.vue";
import SelfRegister from "./pages/visit/visit.selfRegister.vue";
import ActiveVisits from "./pages/visit/visit.activeVisits.vue";
import UpcomingVisits from "./pages/visit/visit.upcomingVisits.vue";

import PageNotFound from "./pages/misc/misc.pageNotFound.vue";

import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ActiveVisits,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/locations",
      name: "Locations",
      component: Locations,
      meta: { requiresAuth: true },
    },
    {
      path: "/users",
      name: "Users",
      component: Users,
      meta: { requiresAuth: true, notForHost: true },
    },
    {
      path: "/signup-complete",
      name: "SignupComplete",
      component: SignupComplete,
    },
    {
      path: "/activate",
      name: "Activation",
      component: Activation,
    },
    {
      path: "/setup",
      name: "Setup",
      component: Setup,
      meta: { requiresAuth: true, notForHost: true },
    },
    {
      path: "/reports",
      name: "Reports",
      component: Reports,
      meta: { requiresAuth: true },
    },
    {
      path: "/evacuation",
      name: "Evacuation",
      component: Evacuation,
      meta: { requiresAuth: true },
    },
    {
      path: "/upcoming-visits",
      name: "UpcomingVisits",
      component: UpcomingVisits,
      meta: { requiresAuth: true },
    },
    {
      path: "/active-visits",
      component: ActiveVisits,
      meta: { requiresAuth: true },
    },
    {
      path: "/calendar",
      component: VisitCalendar,
      meta: { requiresAuth: true },
    },
    {
      path: "/self-register",
      name: "SelfRegister",
      component: SelfRegister,
      meta: { requiresAuth: true, isVisitor: true, notForHost: true },
    },
    {
      path: "/visit/confirm-slot",
      name: "ConfirmSlot",
      component: ConfirmSlot,
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: ResetPassword,
    },
    {
      path: "/forgot_password",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: { requiresAuth: true, notForHost: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: "/help",
      name: "Help",
      component: HelpPage,
      meta: { requiresAuth: true },
    },
    { path: "/404", component: PageNotFound },
    { path: "/:pathMatch(.*)*", redirect: "/404" },
  ],
});
router.beforeEach(function (to, _, next) {
  if (
    (to.meta.requiresAuth && !store.getters.isAuthenticated) ||
    (to.meta.notForHost && !store.getters.isLocationManager)
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
