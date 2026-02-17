import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";

function MainLayout() {
  const contacts = useLoaderData();

  return (
    <>
      <Header contacts={contacts} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

      <Footer contacts={contacts}/>
    </>
  );
}

export default MainLayout;
