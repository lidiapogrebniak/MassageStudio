export async function getCompanyData() {
  const res = await fetch("/data/company.json");

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
}