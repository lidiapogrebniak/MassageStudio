import React from 'react'
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
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