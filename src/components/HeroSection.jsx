import React from 'react'
import '../styles/HeroSection.css';
import { texts } from '../data/texts.uk';
import { Carousel } from 'react-bootstrap';
import MassageButton from './MassageButton';

const HeroSection = () => {
  return (
    <section
      className="section hero-section"
    >

        <Carousel fade={true} indicators={true} controls={true} interval={8000} pause={false}>
            <Carousel.Item>
                <img className="d-block w-100" src="/images/carousel/slide1.png" alt="First slide"/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide1.title}</h5>
                    <p>{texts.heroCarousel.slide1.description}</p>
                    <MassageButton />
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/images/carousel/slide2.png" alt="Second slide"/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide2.title}</h5>
                    <p>{texts.heroCarousel.slide2.description}</p>
                    <MassageButton />
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/images/carousel/slide3.png" alt="Third slide"/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide3.title}</h5>
                    <p>{texts.heroCarousel.slide3.description}</p>
                    <MassageButton />
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/images/carousel/slide4.png" alt="Fourth slide"/>
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