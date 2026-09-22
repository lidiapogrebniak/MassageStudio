import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { Home, About, Contacts, NotFound, Services } from "./lazyPages";
import { rootLoader } from "./loaders/rootLoader";
import { homeLoader } from "./loaders/homeLoader";
import { servicesLoader } from "./loaders/servicesLoader";

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
        loader: homeLoader,
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
        loader: servicesLoader,
      },

      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
