import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";

function MainLayout() {
  const companyData = useLoaderData();

  return (
    <>
      <Header contacts={companyData.contacts} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

      <Footer contacts={companyData.contacts}/>
    </>
  );
}

export default MainLayout;
