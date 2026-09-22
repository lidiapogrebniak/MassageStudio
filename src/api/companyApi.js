export async function getCompanyData() {
  const res = await fetch("/data/company.json");

  if (!res.ok) {
    throw new Error("Failed to fetch company data: " + res.statusText);
  }

  return res.json();
}
