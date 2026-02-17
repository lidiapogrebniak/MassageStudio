import React from 'react'
import '../styles/ServicesSection.css';
import { texts } from '../data/texts.uk';
import {Link} from "react-router-dom";
import ServiceCard from './ServiceCard';
import { FaArrowRight } from 'react-icons/fa6';

const ServicesSection = (props) => {

  let {services} = props;

  return (
    <section className="section services-section">
        <div className="container">
            <h2 className="text-center mb-5">
                {texts.services.title}
            </h2>
            <div className="row g-4 mb-5">
                {services.map(service => (
                    <ServiceCard key={service.id} {...service} />
                ))}
            </div>
            {/* All Services Button */}
        <div className="text-center">
          <Link to="/services"
            className="btn btn-outline-primary btn-lg all-services-btn"
          >
            {texts.services.allServicesBtn}
            <FaArrowRight size={20} />
          </Link>
        </div>
        </div>
    </section>
  )
}

export default ServicesSection