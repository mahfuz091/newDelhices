import { Col, Container, Row } from "react-bootstrap";
import shoppingBag from "../../assets/images/shopping-bag-1.svg";
import medal from "../../assets/images/medal.svg";
import delivery from "../../assets/images/fast.svg";

const WhyChoose = () => {
  return (
    <section className='why-choose'>
      <Container>
        {/* <h2 className='section-title'>Why People Choose us?</h2> */}
        <Row className='gy-20'>
          <Col md={6} lg={4}>
            <div className='choose-card'>
              <div className='card-inner'>
                <div className='choose-img'>
                  <img src={shoppingBag} alt='img' />
                </div>
                <h4 className='sec-title__two'>Ease of ordering</h4>
                <p className='card-desc'>
                  Here&apos;s your chance to discover India&apos;s rich culinary
                  heritage.
                </p>
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className='choose-card'>
              <div className='card-inner'>
                <div className='choose-img'>
                  <img src={medal} alt='img' />
                </div>
                <h4 className='sec-title__two'>Best quality</h4>
                <p className='card-desc'>
                  From the finest ingredients, this dish has an exceptional
                  taste.
                </p>
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className='choose-card'>
              <div className='card-inner'>
                <div className='choose-img'>
                  <img src={delivery} alt='img' />
                </div>
                <h4 className='sec-title__two'>Fast delivery</h4>
                <p className='card-desc'>
                  Here&apos;s your chance to discover India&apos;s rich culinary
                  heritage.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChoose;
