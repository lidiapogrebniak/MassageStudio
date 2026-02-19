import React from 'react'
import styles from './HeroSection.module.css';
import { texts } from '../../data/texts.uk';
import { Carousel } from 'react-bootstrap';
import CtaButton from '../../components/ui/CtaButton';

const HeroSection = () => {
  return (
    <section
      className={`section ${styles.heroSection}`}
    >

        <Carousel fade={true} indicators={true} controls={true} interval={8000} pause={false}>
            <Carousel.Item>
                <img className="d-block w-100" src="/images/carousel/slide1.webp" alt="First slide" fetchPriority='high' decoding='async'/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide1.title}</h5>
                    <p>{texts.heroCarousel.slide1.description}</p>
                    <CtaButton />
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/images/carousel/slide2.webp" alt="Second slide" loading='lazy' decoding='async'/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide2.title}</h5>
                    <p>{texts.heroCarousel.slide2.description}</p>
                    <CtaButton  />
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/images/carousel/slide3.webp" alt="Third slide" loading='lazy' decoding='async'/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide3.title}</h5>
                    <p>{texts.heroCarousel.slide3.description}</p>
                    <CtaButton />
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="/images/carousel/slide4.webp" alt="Fourth slide" loading='lazy' decoding='async'/>
                <Carousel.Caption>
                    <h5>{texts.heroCarousel.slide4.title}</h5>
                    <p>{texts.heroCarousel.slide4.description}</p>
                    <CtaButton />
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </section>
  )
}

export default HeroSection