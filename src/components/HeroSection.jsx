import React from 'react'
import '../styles/HeroSection.css';
import { texts } from '../utils/texts.uk';
import { Carousel } from 'react-bootstrap';
import MassageButton from './MassageButton';
import slide1 from '../../public/images/slide1.png';
import slide2 from '../../public/images/slide2.png';
import slide3 from '../../public/images/slide3.png';
import slide4 from '../../public/images/slide4.png';

const HeroSection = () => {
  return (
    <section
      className="section hero-section"
    >

        <Carousel fade={true} indicators={true} controls={true} interval={8000} pause={false}>
            <Carousel.Item>
                <img className="d-block w-100" src={slide1} alt="First slide"/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide1.title}</h5>
                    <p>{texts.heroCarousel.slide1.description}</p>
                    <MassageButton />
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={slide2} alt="Second slide"/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide2.title}</h5>
                    <p>{texts.heroCarousel.slide2.description}</p>
                    <MassageButton />
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={slide3} alt="Third slide"/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide3.title}</h5>
                    <p>{texts.heroCarousel.slide3.description}</p>
                    <MassageButton />
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={slide4} alt="Fourth slide"/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide4.title}</h5>
                    <p>{texts.heroCarousel.slide4.description}</p>
                    <MassageButton />
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </section>
  )
}

export default HeroSection