import { getServices } from "../../api/servicesApi";

export async function servicesLoader() {
  return {
    services: await getServices(),
  };
}
