import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout";
import { HomePage } from "../pages/Home";
import { AboutPage } from "../pages/About";
import { ListPage } from "../pages/List";
import { Registr, AuthGuard } from "@/pages/AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard onlyPublic={true}>
        <Registr />
      </AuthGuard>
    ),
  },
  {
    path: "/app",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "list/:listId", Component: ListPage },
    ],
  },
]);
