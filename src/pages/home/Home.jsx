import React from 'react'
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import { useLoaderData } from 'react-router-dom';

const Home = () => {

  const data = useLoaderData();

  return (
    <>
        <HeroSection />
        <ServicesSection services={data.featuredServices} />
    </>
  );
}

export default Home