import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../../assets/images/innovation.png";
import { Link } from "react-router-dom";

const Innovation = () => {
  return (
    <section className='innovation'>
      <Container>
        <div className='inner'>
          <Row className='gy-20'>
            <Col md={6}>
              <div className='innovation-left'>
                <h3>
                  Culinary Ingenuity: <br /> Blending Tradition with <br />{" "}
                  <span>Innovation</span>
                </h3>
                <p>
                  Indian cuisine offers a rich and diverse array of flavors,
                  textures, and spices. Are you interested in exploring
                  traditional recipes
                </p>
                <Link to='' className='thm-btn'>
                  <b>To Start</b>
                  <span></span>
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <img className='img-fluid' src={image} alt='' />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Innovation;
