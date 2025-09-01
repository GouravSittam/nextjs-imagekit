import type {Route} from "next";

const ROUTES = {
  HOME: "/" as Route,
  STUDIO: (id: string) => `/studio/${id}` as Route,
};

export default ROUTES;
