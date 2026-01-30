import React from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Contacts from './components/Contacts.jsx';
import NotFound from './components/NotFound.jsx';
import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection.jsx';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} /> {/* 404 страница */}
        </Routes>
        <Header />
        <HeroSection />
        <Home />
    </>
  );
}

export default App;