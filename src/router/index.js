import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Unprotected from "../views/Unprotected.vue";
import Dashboard from "../views/Dashboard.vue";
import Protected from "../views/Protected.vue";
import Auth from "../views/Auth.vue";
import auth from "../middleware/auth";
import log from "../middleware/log";
import NotFound from "../views/NotFound.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Welcome",
        middleware: log,
      },
    },
    {
      path: "/unprotected",
      name: "unprotected",
      component: Unprotected,
      meta: {
        title: "Unprotected Page",
        middleware: log,
      },
    },
    {
      path: "/protected",
      name: "protected",
      component: Protected,
      meta: {
        title: "Protected Page",
        middleware: auth,
        log,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        title: "Dashboard",
        middleware: auth,
      },
    },
    {
      path: "/:value",
      name: "auth",
      component: Auth,
      meta: {
        title: "Login / Register",
      },
    },
    { path: "/:pathMatch(.*)", component: NotFound },
  ],
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);

    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});
export default router;
