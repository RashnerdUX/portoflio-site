import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/mcu-index", "routes/mcu/index.tsx", {id: "MCUMovieIndex"}),
    route("/mcu-index/detail/:movieId/:movieName", "routes/mcu/details.tsx", {id: "MCUMovieDetail"},[
        route("rate-movie/", "routes/mcu/rateMovie.tsx", {id: "MCUMovieVote"}),
    ],),
    route("/watchlist", "routes/mcu/watchlist.tsx", {id: "MCUWatchlist"}),
] satisfies RouteConfig;
