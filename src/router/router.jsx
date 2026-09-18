import { createBrowserRouter } from "react-router-dom";
import { getFeaturedServices, getServices } from "../api/servicesApi";
import { getCompanyData } from "../api/companyApi";

import MainLayout from "../layouts/MainLayout";
import { Home, About, Contacts, NotFound, Services } from "./lazyPages";

async function rootLoader() {
  return await getCompanyData();
}

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
        Component: Home,
        loader: async () => {
          return {
            featuredServices: await getFeaturedServices(),
          };
        },
      },

      {
        path: "about",
        Component: About,
      },

      {
        path: "contacts",
        Component: Contacts,
      },

      {
        path: "services",
        Component: Services,
        loader: async () => {
          return {
            services: await getServices(),
          };
        },
      },

      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
