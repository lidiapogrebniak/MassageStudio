import { useRouteLoaderData } from "react-router-dom";

export function useContacts() {
  return useRouteLoaderData("root")?.contacts ?? {};
}
