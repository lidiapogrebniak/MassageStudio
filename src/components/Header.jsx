import React from 'react'
import { FaPhoneAlt, FaTelegramPlane, FaViber, FaInstagram } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import {Link} from "react-router-dom";
import logo from '../../public/images/logo.png';
import '../styles/Header.css';
import { texts } from '../data/texts.uk'; '../utils/texts.uk.js';

const NavBar = () => {
    const navSlide = () => {
      const navburger = document.querySelector(".nav");
      navburger.classList.toggle("toggle");
    };

const telephoneShort = texts.contacts.phone.replace(/\D/g, '');

  return (
    <>
        <nav className="navbar bg-white sticky-top navbar-expand-lg navbar-light">
             <div className="container">

                <Link to="/" className="navlogo navbar-brand">
                    <img src={logo} alt="Vadhiveda" className="d-inline-block align-top" />
                </Link>

                {/* Mobile Toggle Button - Bootstrap */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Items - Bootstrap Collapse */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul
                    className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto"
                    >
                        <li className="nav-item">
                            <Link className='nav-link' to="/">{texts.pages.home}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/about">{texts.pages.about}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/services">{texts.pages.services}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/contacts">{texts.pages.contacts}</Link>
                        </li>
                    </ul>

                    <div className="d-block d-lg-none contact-info-separator"></div>
                    {/* Contact Info */}
                    <div className="d-flex align-items-center gap-3 ">
                        {/* Location */}
                        <a
                            href={texts.contacts.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center gap-2 text-decoration-none nav-link phone-link"

                        >
                            <FaLocationDot />
                            <span>{texts.contacts.locationCity}</span>
                        </a>
                        <div className="d-flex gap-2 contact-info">
                            {/* Phone */}
                            <a
                                href={`tel:${telephoneShort}`}
                                className="btn btn-sm rounded-circle social-icon-link"
                            >
                                <FaPhoneAlt />
                            </a>
                            <a
                            href="https://t.me/vadhiveda"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm rounded-circle social-icon-link"
                            >
                                <FaTelegramPlane />
                            </a>
                            <a
                            href={`viber://chat?number=${telephoneShort}`}
                            className="btn btn-sm rounded-circle social-icon-link"
                            >
                            <FaViber />
                            </a>
                            <a
                            href="https://instagram.com/vadhiveda"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm rounded-circle social-icon-link"
                            >
                            <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default NavBar