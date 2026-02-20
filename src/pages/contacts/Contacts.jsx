import React from 'react'
import styles from './Contacts.module.css';
import { texts } from '../../data/texts.uk';
import { useRouteLoaderData } from 'react-router-dom';
import { buildProfileLink } from '../../utils/socialHelper';

const Contacts = () => {
  const companyData = useRouteLoaderData('root');
  const contacts = companyData ? companyData.contacts : {};
  const telephoneShort = contacts.phone && contacts.phone.replace(/\D/g, '');

  return (
    <section className="section">
      <div className="container">
        <h2 className="text-center mb-5">{texts.pages.contacts}</h2>
        <div className="row g-4 align-items-stretch">

          {/*  Map  */}
          <div className="col-lg-7">
            <div className="map-wrapper shadow rounded overflow-hidden h-100">
              <iframe
                src={contacts.googleEmbeddedMapLink}
                width="100%"
                height="100%"
                style={{border:0, minHeight:400}}
                allowfullscreen=""
                loading="lazy">
              </iframe>

            </div>
          </div>

          {/*  Contacts */}
          <div className="col-lg-5">
            <div className={styles.contactCard + " shadow rounded p-4 h-100 d-flex flex-column justify-content-center"}>
              <ul className="list-unstyled contact-list">

                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-geo-alt-fill me-3 fs-4 text-primary"></i>
                  <div>
                    <strong>{texts.contactsPage.address}:</strong><br/>
                    {contacts.address}
                  </div>
                </li>

                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-telephone-fill me-3 fs-4 text-primary"></i>
                  <div>
                    <strong>{texts.contactsPage.phone}:</strong><br/>
                    <a href={`tel:${telephoneShort}`}>{contacts.phone}</a>
                  </div>
                </li>

                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-telegram me-3 fs-4 text-primary"></i>
                  <div>
                    <strong>{texts.contactsPage.telegram}:</strong><br/>
                    <a href={buildProfileLink('telegram', contacts.telegramUsername)} target="_blank">{contacts.telegramUsername}</a>
                  </div>
                </li>

                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-instagram me-3 fs-4 text-primary"></i>
                  <div>
                    <strong>{texts.contactsPage.instagram}:</strong><br/>
                    <a href={buildProfileLink('instagram', contacts.instagramUsername)} target="_blank">{contacts.instagramUsername}</a>
                  </div>
                </li>

                <li className="d-flex align-items-start">
                  <i className="bi bi-chat-dots-fill me-3 fs-4 text-primary"></i>
                  <div>
                    <strong>{texts.contactsPage.viber}:</strong><br/>
                    <a href={buildProfileLink('viber', telephoneShort)} target="_blank">
                      {texts.contactsPage.writeToViber}
                    </a>
                  </div>
                </li>

              </ul>

            </div>
          </div>

        </div>
      </div>
  </section>

  )
}

export default Contacts