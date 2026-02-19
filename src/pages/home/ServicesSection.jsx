import React from 'react'
import styles from './ServicesSection.module.css';
import { texts } from '../../data/texts.uk';
import {Link} from "react-router-dom";
import ServiceCard from '../../components/feature/ServiceCard';
import { FaArrowRight } from 'react-icons/fa6';

const ServicesSection = (props) => {

  let {services} = props;

  return (
    <section className={`section ${styles.servicesSection}`}>
        <div className="container">
            <h2 className="text-center mb-5">
                {texts.services.title}
            </h2>
            <div className="row g-4 mb-5">
                {services.map(service => (
                    <ServiceCard key={service.id} {...service} lazy={true} />
                ))}
            </div>
            {/* All Services Button */}
        <div className="text-center">
          <Link to="/services"
            className={`btn btn-outline-primary btn-lg ${styles.allServicesBtn}`}
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