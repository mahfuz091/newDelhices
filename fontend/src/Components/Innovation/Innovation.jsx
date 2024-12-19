import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../../assets/images/innovation.png";
import { Link } from "react-router-dom";

const Innovation = () => {
  return (
    <section className='innovation'>
      <Container>
        <div className='inner'>
          <Row className='gy-30'>
            <Col lg={6}>
              <div className='innovation-left'>
                <h3>
                  Ingéniosité culinaire : <br /> Mélange de tradition et
                  <br /> <span>Innovation</span>
                </h3>
                <p>
                  La cuisine indienne offre une gamme riche et diversifiée de
                  saveurs, de textures et d&apos;épices. Vous souhaitez
                  découvrir des recettes traditionnelles
                </p>
                <Link to='menu' className='thm-btn mt-3'>
                  <b>Pour commencer</b>
                  <span></span>
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <img className='img-fluid' src={image} alt='' />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Innovation;
