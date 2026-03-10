import React from 'react'
import ServiceCard from '../../components/feature/ServiceCard';
import { texts } from '../../data/texts.uk';
import { useLoaderData } from 'react-router-dom';
import ContactModal from '../../components/feature/contact/ContactModal';

const Services = () => {
  const { services } = useLoaderData();
   const contactModalRef = React.useRef(null);

   const openContactModal = () => {
    contactModalRef.current?.open();
  }

  return (
    <>
    <section className="section">
      <div className="container">
        <h2 className="text-center mb-5">{texts.services.title}</h2>
        <div className="row g-4 mb-5">
          {services.map(service => (
            <ServiceCard key={service.id} lazy={false} onCtaButtonClick={openContactModal} service={service} />
          ))}
        </div>
      </div>
    </section>
    <ContactModal ref={contactModalRef} />
    </>
  )
}

export default Services