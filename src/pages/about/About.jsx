import React from 'react'
import styles from './About.module.css';
import { texts } from '../../data/texts.uk';

const About = () => {
  return (
    <>
      <section className={styles.aboutSection}>
        <div className="container">
          <h2 className="text-center mb-5">{texts.aboutMe.title}</h2>

          <div className={styles.aboutBlock}>
            <div className={styles.aboutImage}>
              <img src="../images/about_me.jpg" alt="Массажист Анна"/>
            </div>
            <div className={styles.aboutText}>
              <p>{texts.aboutMe.intro}</p>
              <h6>{texts.aboutMe.features}</h6>
              <ul className={styles.featuresList}>
                {texts.aboutMe.featuresList.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <h5>{texts.aboutMe.approuchTitle}</h5>
              <p>{texts.aboutMe.approuchDescription1}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About