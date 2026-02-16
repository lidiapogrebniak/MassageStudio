import React from 'react'
import '../styles/ServicesSection.css';
import { texts } from '../data/texts.uk';
import { useState, useEffect } from 'react';
import MassageButton from './MassageButton';

const ServicesSection = () => {
    const [massages, setMassages] = useState([]);

    useEffect(() => {
        fetch('/data/massages.json')
        .then(res => res.json())
        .then(data => setMassages(data));
    }, []);

  return (
    <section className="section services-section">
        <div className="container">
            <h2 className="text-center mb-5">
                {texts.services.title}
            </h2>
            <div className="row g-4 mb-5">
                {massages.map(m => (
                    <div key={m.id} className="col-12 col-sm-6 col-lg-3 service-card">
                        <div className='card border-0 shadow-sm h-100'>
                            <img src={`/images/massages/${m.img}`} alt={m.title} className="card-img" />
                            <div className="card-body d-flex flex-column">
                                <h3 className='card-title h5 mb-3'>{m.title}</h3>
                                <div className='d-flex justify-content-between align-items-center mb-3 mt-auto'>
                                    <span className='duration text-muted'>{m.duration}</span>
                                    <span className='price'>{m.price}</span>
                                </div>
                                <MassageButton text={texts.services.subscribeBtn} className="subscribe-button w-100" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default ServicesSection