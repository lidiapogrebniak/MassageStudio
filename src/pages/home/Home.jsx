import React from 'react'
import { useState } from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import { useLoaderData } from 'react-router-dom';
import ContactModal from '../../components/feature/contact/ContactModal';

const Home = () => {

  const data = useLoaderData();
  const contactModalRef = React.useRef(null);

  const openContactModal = () => {
    contactModalRef.current?.open();
  }

  return (
    <>
        <HeroSection onCtaButtonClick={openContactModal} />
        <ServicesSection services={data.featuredServices}
          onCtaButtonClick={openContactModal} />
        <ContactModal ref={contactModalRef} />

    </>
  );
}

export default Home