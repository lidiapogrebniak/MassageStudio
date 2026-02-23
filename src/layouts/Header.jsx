import React from 'react'
import { FaPhoneAlt, FaTelegramPlane, FaViber, FaInstagram } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import {Link} from "react-router-dom";
import {Nav, Navbar, Container} from "react-bootstrap"
import styles from './Header.module.css';
import { texts } from '../data/texts.uk';
import { buildProfileLink } from '../utils/socialHelper';
import { useState } from 'react';

const Header = (props) => {
    const { contacts } = props;
    const telephoneShort = contacts.phone && contacts.phone.replace(/\D/g, '');

    const [expanded, setExpanded] = useState(false);

  return (
    <>
        <Navbar expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <img src="/images/logo.png" alt="Vadhiveda" className="d-inline-block align-top" />
                    </Link>
                </Navbar.Brand>

                {/* Mobile Toggle Button - Bootstrap */}
                <Navbar.Toggle aria-controls='navbarNav'/>

                {/* Navigation Items - Bootstrap Collapse */}
                <Navbar.Collapse id="navbarNav">
                    <Nav onClick={() => setExpanded(false)}>
                        <Nav.Link as={Link} to="/">
                            {texts.pages.home}
                        </Nav.Link>
                       <Nav.Link as={Link} to="/about" >
                            {texts.pages.about}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/services" >
                            {texts.pages.services}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contacts" >
                           {texts.pages.contacts}
                        </Nav.Link>
                    </Nav>

                    <div
                    className={`${styles.contactInfoSeparator} d-block d-lg-none`}
                    ></div>
                    {/* Contact Info */}
                    <div className="d-flex align-items-center gap-3 ">
                        {/* Location */}
                        <a
                            href={contacts.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="d-flex align-items-center gap-2 text-decoration-none nav-link phone-link"

                        >
                            <FaLocationDot />
                            <span>{contacts.locationCity}</span>
                        </a>
                        <div className="d-flex gap-2 contact-info">
                            {/* Phone */}
                            <a
                                href={`tel:${telephoneShort}`}
                                className={`btn btn-sm rounded-circle ${styles.socialIconLink}`}
                            >
                                <FaPhoneAlt />
                            </a>
                            <a
                            href={buildProfileLink('telegram', contacts.telegramUsername)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn btn-sm rounded-circle ${styles.socialIconLink}`}
                            >
                                <FaTelegramPlane />
                            </a>
                            <a
                            href={buildProfileLink('viber', telephoneShort)}
                            className={`btn btn-sm rounded-circle ${styles.socialIconLink}`}
                            >
                            <FaViber />
                            </a>
                            <a
                            href={buildProfileLink('instagram', contacts.instagramUsername)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn btn-sm rounded-circle ${styles.socialIconLink}`}
                            >
                            <FaInstagram />
                            </a>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
          </Navbar>
    </>
  )
}

export default Header