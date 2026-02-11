import React from 'react'
import '../styles/Footer.css';
import logoImage from "../../public/images/logo.png";
import { texts } from '../utils/texts.uk';
import { FaClock, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot, FaEnvelope } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const telephoneShort = texts.contacts.phone.replace(/\D/g, '');

const Footer = () => {
  return (
    <footer className="footer bg-light text-center border-top">
      <div className="container">
        <div className="row g-4 pb-4 mb-4 border-bottom">
          <div className="col-12 col-lg-5">
            <Link to="/" className="brand-logo">
              <img src={logoImage} alt="Vadhiveda" />
            </Link>
            <p className="text-muted about-text">
              {texts.brand.aboutText}
            </p>
          </div>

          {/* Schedule Column */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="d-flex flex-column align-items-center">
                <h3 className="h6 mb-3">
                {texts.footer.schedule}
                </h3>
                <ul className="list-unstyled">
                <li className="mb-2">
                    <div className="d-flex align-items-start schedule">
                        <FaClock size={18} />
                    <div className='schedule-text'>
                        <div>{texts.footer.scheduleDetails.workdays}</div>
                        <div>{texts.footer.scheduleDetails.weekends}</div>
                    </div>
                    </div>
                </li>
                </ul>
            </div>
          </div>

          {/* Contacts Column */}
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="d-flex flex-column align-items-center">
                <h3 className="h6 mb-3">
                {texts.footer.contacts}
                </h3>
                <ul className="list-unstyled">
                <li className="mb-3">
                    <a
                    href={`tel:${telephoneShort}`}
                    className="footer-link d-flex align-items-center text-decoration-none"
                    >
                        <FaPhoneAlt size={18} />
                        <span>{texts.contacts.phone}</span>
                    </a>
                </li>
                <li className="mb-3">
                    <a
                    href={`mailto:${texts.contacts.mail}`}
                    className="footer-link d-flex align-items-center text-decoration-none"
                    >
                    <FaEnvelope size={16}/>
                    <span>{texts.contacts.mail}</span>
                    </a>
                </li>
                <li className="mb-3">
                    <a
                    href={texts.contacts.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link d-flex align-items-center text-decoration-none"
                    >
                    <FaLocationDot size={16} />
                    <span>{texts.contacts.address}</span>
                    </a>
                </li>
                </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-3">
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            {texts.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer