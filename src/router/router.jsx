import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { getFeaturedServices, getServices } from "../api/servicesApi";

import MainLayout from "../layouts/MainLayout";

async function rootLoader() {
  const res = await fetch("/data/company.json");

  if (!res.ok) {
    throw new Error("Failed to load data");
  }

  return res.json();
}

// lazy loading страниц
const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about/About"));
const Contacts = lazy(() => import("../pages/contacts/Contacts"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Services = lazy(() => import("../pages/services/Services"));

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
        loader: async () => {
          return {
            featuredServices: await getFeaturedServices(),
          };
        },
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
        loader: async () => {
          return {
            services: await getServices(),
          };
        },
      },

      {
        path: "*",
        element: <NotFound />,
      },

    ],
  },
]);

export default router;
