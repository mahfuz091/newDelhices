import { Col, Container, Row } from "react-bootstrap";
import ctaImage from "../../assets/images/cta.png";

const Cta = () => {
  return (
    <section className='cta'>
      <Container>
        <div className='cta__bg'>
          <Row>
            <Col lg={6}>
              <div className='cta__image'>
                <img src={ctaImage} alt='' />
              </div>
            </Col>
            <Col lg={6}>
              <div className='cta__content'>
                <h2 className='cta__content-title'>Let’s Connected!</h2>
                <p className='cta__content-desc'>
                  Sign up for newsletter & 10% off bill offers and invites!
                </p>
                <div>
                  <div className='cta__newsletter mc-form'>
                    <input
                      placeholder='Enter your email address'
                      type='text'
                      name='EMAIL'
                    />
                    <button type='submit' className='thm-btn'>
                      <b>Subscribe</b>
                      <span></span>
                    </button>
                  </div>
                  <div className='mc-form__response'></div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Cta;
