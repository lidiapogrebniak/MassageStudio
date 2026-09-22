import { getCompanyData } from "../../api/companyApi";

export async function rootLoader() {
  return await getCompanyData();
}
