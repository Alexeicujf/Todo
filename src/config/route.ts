import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout";
import { HomePage } from "../pages/Home";
import { AboutPage } from "../pages/About";
import { ListPage } from "../pages/List";
import { Login } from "@/pages/Login";
import { Registr } from "@/pages/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login, // Теперь вход — это самая первая самостоятельная страница
  },
  {
    path: "/register",
    Component: Registr, // Регистрация — тоже сама по себе
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: `list/:listId`, Component: ListPage },
    ],
  },
]);

// мидлвеир без привязки к редакс и реакту на js
// Компоненты писать с заглавной буквы!!!
