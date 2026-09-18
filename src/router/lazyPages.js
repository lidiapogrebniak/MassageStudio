import { lazy } from "react";

export const Home = lazy(() => import("../pages/home/Home"));
export const About = lazy(() => import("../pages/about/About"));
export const Contacts = lazy(() => import("../pages/contacts/Contacts"));
export const NotFound = lazy(() => import("../pages/NotFound"));
export const Services = lazy(() => import("../pages/services/Services"));
