/* eslint-disable no-unused-vars */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import footerData from "./footerData";

const {
  logo,
  footerBgTwo,
  shapeTwo,
  footerLogo,
  posts,
  widgetText,
  about,
  widgetSocial,
  infos,
  footerAbout,
  services,
  quickLinks,
  bottomLinks,
} = footerData;

const Footer = ({ SignIn }) => {
  console.log(SignIn);

  return (
    <footer className={`main-footer ${SignIn ? "signIn-footer" : ""}`}>
      <Container>
        <Row>
          <Col md={6} lg={4}>
            <div
              className='footer-widget footer-widget--about-two'
              data-aos='fade-up'
              data-aos-duration='1500'
              data-aos-delay='00'
            >
              <a href='/' className='footer-widget__logo'>
                <img src={logo} width={184} style={{ height: "auto" }} alt='' />
              </a>
              <p className='footer-widget--about-two__text'>{widgetText}</p>
            </div>
          </Col>
          <Col md={6} lg={2}>
            <div
              className='footer-widget footer-widget--links'
              data-aos='fade-up'
              data-aos-duration='1600'
              data-aos-delay='100'
            >
              <h2 className='footer-widget__title'>Quick Link</h2>
              <ul className='list-unstyled footer-widget__links'>
                {about.map(({ id, title, href }) => (
                  <li key={id}>
                    <Link href={href}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <div
              className='footer-widget footer-widget--links main-footer-two--ml30'
              data-aos='fade-up'
              data-aos-duration='1700'
              data-aos-delay='200'
            >
              <h2 className='footer-widget__title'>Address</h2>
              <ul className='footer-widget__info list-unstyled'>
                <li>
                  <div className='footer-widget__info--icon'>
                    <i className='fas fa-phone-volume'></i>
                  </div>
                  <div>
                    <a href='tel:09969569535'>
                      <span>Phone Number:</span> <br /> 099 695 695 35
                    </a>
                  </div>
                </li>
                <li>
                  <div className='footer-widget__info--icon'>
                    <i className='fas fa-location-dot'></i>
                  </div>
                  <div>
                    <span>Address:</span> <br />
                    8 RUE DES PERRIERES <br />
                    21000 DIJON
                  </div>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <div
              className='footer-widget footer-widget--posts'
              data-aos='fade-up'
              data-aos-duration='1800'
              data-aos-delay='300'
            >
              <h2 className='footer-widget__title'>Open Hours</h2>
              <ul className='footer-widget__info list-unstyled'>
                <li>
                  <div>Monday to Sunday 11:00-23:00</div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
