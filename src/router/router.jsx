import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { getFeaturedServices, getServices } from "../api/servicesApi";
import { getCompanyData } from "../api/companyApi";

import MainLayout from "../layouts/MainLayout";

async function rootLoader() {
  return await getCompanyData();
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
    hydrateFallbackElement: <div>Loading...</div>,
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
