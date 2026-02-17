// api/servicesApi.js
let servicesCache = null;

export async function getServices() {
  if (servicesCache) {
    return servicesCache;
  }

  const res = await fetch("/data/services.json");

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  servicesCache = await res.json();

  return servicesCache;
}

export async function getFeaturedServices() {
  const services = await getServices();

  return services.slice(0, 4);
}

export async function getServiceById(id) {
  const services = await getServices();

  return services.find(s => s.id === id);
}
