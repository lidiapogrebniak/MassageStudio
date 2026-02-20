import React from 'react'
import styles from './About.module.css';
import { texts } from '../../data/texts.uk';

const About = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-5">{texts.pages.about}</h2>

          <div className={styles.aboutBlock}>
            <div className={styles.aboutImage}>
              <img src="../images/about_me.jpg" alt="Массажист Анна"/>
            </div>
            <div className={styles.aboutText}>
              <p>{texts.aboutMePage.intro}</p>
              <h6>{texts.aboutMePage.features}</h6>
              <ul className={styles.featuresList}>
                {texts.aboutMePage.featuresList.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <h5>{texts.aboutMePage.approuchTitle}</h5>
              <p>{texts.aboutMePage.approuchDescription}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About