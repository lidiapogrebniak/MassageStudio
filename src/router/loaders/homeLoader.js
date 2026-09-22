import { getFeaturedServices } from "../../api/servicesApi";

export async function homeLoader() {
  return {
    featuredServices: await getFeaturedServices(),
  };
}
