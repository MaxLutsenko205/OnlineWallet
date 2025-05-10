import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/indexRoute.tsx"),
  layout("./components/layout/AuthLayout.tsx", [
    route("login", "./routes/auth/loginRoute.tsx"),
    route("register", "./routes/auth/registerRoute.tsx"),
  ]),
  layout("./components/layout/AppLayout.tsx", [
    route("dashboard", "./routes/app/dashboardRoute.tsx"),
    route("stats", "./routes/app/statsRoute.tsx"),
    route("settings", "./routes/app/settingsRoute.tsx"),
  ]),
] satisfies RouteConfig;
