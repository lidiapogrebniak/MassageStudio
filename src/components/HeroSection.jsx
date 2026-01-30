import React from 'react'
import '../styles/HeroSection.css';
import { texts } from '../utils/texts.uk';
import { Link } from 'react-router-dom';
import slide1 from '../../public/images/slide1.png';
import slide2 from '../../public/images/slide2.png';
import slide3 from '../../public/images/slide3.png';

const HeroSection = () => {
  return (
    <section
      className="position-relative overflow-hidden d-flex align-items-center justify-content-center text-center hero-section"
    >
        <div className="container">
            <div className="row justify-content-center">
                <div id="carouselHero" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img className="d-block w-100" src={slide1} alt="First slide"/>
                        </div>
                        <div className ="carousel-item">
                        <img className="d-block w-100" src={slide2} alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100" src={slide3} alt="Third slide"/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselHero" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselHero" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection