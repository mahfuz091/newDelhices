import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../../assets/images/spiceandtradition.png";
import { Link } from "react-router-dom";

const SpiceAndTradition = () => {
  return (
    <section className='spice-and-tradition'>
      <Container>
        <div className='inner'>
          <Row>
            <Col md={4}>
              <img className='img-fluid' src={image} alt='image' />
            </Col>
            <Col md={8}>
              <div className='spice-right'>
                <h3>
                  Taste India A Journey <br /> Through{" "}
                  <span>Spice and Tradition</span>
                </h3>
                <p>
                  Indian cuisine offers a rich and diverse array of flavors,
                  textures, and spices. Are you interested in exploring
                  traditional recipes
                </p>
                <Link to='' className='thm-btn'>
                  <b>Order Now</b> <span></span>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default SpiceAndTradition;
