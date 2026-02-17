import React from 'react'
import '../styles/ServiceCard.css';
import { texts } from '../data/texts.uk';
import MassageButton from './MassageButton';

const ServiceCard = (service) => {
  return (
    <div key={service.id} className="col-12 col-sm-6 col-lg-3 service-card">
        <div className='card border-0 shadow-sm h-100'>
            <img src={`/images/massages/${service.img}`} alt={service.title} className="card-img" loading='lazy' />
            <div className="card-body d-flex flex-column">
                <h3 className='card-title h5 mb-3'>{service.title}</h3>
                <div className='d-flex justify-content-between align-items-center mb-3 mt-auto'>
                    <span className='duration text-muted'>{service.duration}</span>
                    <span className='price'>{service.price}</span>
                </div>
                <MassageButton text={texts.services.subscribeBtn} className="subscribe-button w-100" />
            </div>
        </div>
    </div>
  )
}

export default ServiceCard