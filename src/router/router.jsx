import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "../layouts/MainLayout";

async function rootLoader() {
  const res = await fetch("/data/data.json");

  if (!res.ok) {
    throw new Error("Failed to load data");
  }

  return res.json();
}

// lazy loading страниц
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contacts = lazy(() => import("../pages/Contacts"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Services = lazy(() => import("../pages/Services"));

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <MainLayout />,
    loader: rootLoader,
    children: [

      {
        index: true,
        element: <Home />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "contacts",
        element: <Contacts />,
      },

      {
        path: "services",
        element: <Services />,
      },

      {
        path: "*",
        element: <NotFound />,
      },

    ],
  },
]);

export default router;
