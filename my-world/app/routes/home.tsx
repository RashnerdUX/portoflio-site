import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Predeploy } from "~/pre-deploy/predeploy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nerdverse | Welcome to the Multiverse for Nerds" },
    { name: "description", content: "Welcome to the Nerdverse!" },
  ];
}

export default function Home() {
  return <Predeploy />;
}
