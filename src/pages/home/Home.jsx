import { useState } from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import { useLoaderData } from "react-router-dom";
import ContactModal from "../../components/feature/contact/ContactModal";

const Home = () => {
  const data = useLoaderData();
  const [showContactModal, setShowContactModal] = useState(false);

  const openContactModal = () => {
    setShowContactModal(true);
  };
  const closeContactModal = () => {
    setShowContactModal(false);
  };

  return (
    <>
      <HeroSection onCtaButtonClick={openContactModal} />
      <ServicesSection
        services={data.featuredServices}
        onCtaButtonClick={openContactModal}
      />
      <ContactModal show={showContactModal} onClose={closeContactModal} />
    </>
  );
};

export default Home;
