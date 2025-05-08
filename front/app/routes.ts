import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/app/index.tsx"),
  layout("./routes/auth/layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
  ]),
  layout("./routes/app/layout.tsx", [
    route("dashboard", "./routes/app/dashboard.tsx"),
    route("stats", "./routes/app/stats.tsx"),
    route("settings", "./routes/app/settings.tsx"),
  ]),
] satisfies RouteConfig;
