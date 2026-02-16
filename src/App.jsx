import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Contacts from './components/Contacts.jsx';
import NotFound from './components/NotFound.jsx';
import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState({});

      useEffect(() => {
          fetch('/data/data.json')
          .then(res => res.json())
          .then(data => setContacts(data));
      }, []);
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} /> {/* 404 страница */}
        </Routes>
        <Header contacts={contacts} />
        <HeroSection />
        <ServicesSection />
        <Home />
        <Footer contacts={contacts} />
    </>
  );
}

export default App;