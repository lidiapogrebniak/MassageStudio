import React from 'react'
import ServiceCard from '../../components/feature/ServiceCard';
import { texts } from '../../data/texts.uk';
import { useLoaderData } from 'react-router-dom';
import styles from './Services.module.css';

const Services = () => {
  const { services } = useLoaderData();
  return (
    <section className={`${styles.servicesSection} section`}>
      <div className="container">
        <h2 className="text-center mb-5">{texts.services.title}</h2>
        <div className="row g-4 mb-5">
          {services.map(service => (
            <ServiceCard key={service.id} {...service} lazy={false} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services