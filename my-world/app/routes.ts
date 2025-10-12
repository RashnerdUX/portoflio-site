import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/mcu-index", "routes/mcu/index.tsx"),
    route("/detail/:movieName", "routes/mcu/details.tsx"),
    route("/vote/:movieId", "routes/mcu/vote.tsx")
] satisfies RouteConfig;
