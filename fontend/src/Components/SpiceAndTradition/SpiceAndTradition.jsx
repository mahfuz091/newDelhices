import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../../assets/images/spiceandtradition.png";
import { Link } from "react-router-dom";

const SpiceAndTradition = () => {
  return (
    <section className='spice-and-tradition'>
      <Container>
        <div className='inner'>
          <Row className='gy-20'>
            <Col lg={4} className='text-center'>
              <img className='spice-img' src={image} alt='image' />
            </Col>
            <Col lg={8}>
              <div className='spice-right'>
                <h3>
                  Goûtez l&apos;Inde Un voyage à travers{" "}
                  <span>les épices et la tradition</span>
                </h3>
                <p>
                  La cuisine indienne offre une gamme riche et diversifiée de
                  saveurs, de textures et d&apos;épices. Vous souhaitez
                  découvrir des recettes traditionnelles
                </p>
                <Link to='menu' className='thm-btn mt-3'>
                  <b>Commandez maintenant</b> <span></span>
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
