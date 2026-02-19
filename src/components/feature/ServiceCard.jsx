import React from 'react'
import styles from './ServiceCard.module.css';
import { texts } from '../../data/texts.uk';
import CtaButton from '../ui/CtaButton';

const ServiceCard = (service, lazy) => {
  return (
    <div key={service.id} className="col-12 col-sm-6 col-lg-3 service-card">
        <div className={`${styles.card} card border-0 shadow-sm h-100`}>
            <img className={styles.cardImg} src={`/images/massages/${service.img}`} alt={service.title} loading={lazy ? 'lazy' : 'eager'} />
            <div className={`${styles.cardBody} d-flex flex-column`}>
                <h3 className={`${styles.cardTitle} h5 mb-3`}>{service.title}</h3>
                <div className={`${styles.cardFooter} d-flex justify-content-between align-items-center mb-3 mt-auto`}>
                    <span className={`${styles.duration} text-muted`}>{service.duration}</span>
                    <span className={styles.price}>{service.price}</span>
                </div>
                <CtaButton text={texts.services.subscribeBtn} className={`${styles.subscribeButton} w-100`} />
            </div>
        </div>
    </div>
  )
}

export default ServiceCard