import { Col, Container, Row } from "react-bootstrap";
import bannerbg from "../../assets/images/banner-bg.png";

const Banner = () => {
  return (
    <section className='banner'>
      <Container>
        <Row>
          <Col xl={7}>
            <div className='banner-content'>
              <h2 className='banner-title'>
                Meeting, eating, and savoring true taste
              </h2>
              <p className='banner-desc'>
                India&apos;s culinary journey is a symphony of flavors, aromas,{" "}
                <br />
                and traditions. Each dish tells a story—a story of diverse{" "}
                <br />
                cultures, ancient spices, and centuries-old techniques, <br />{" "}
                passed down through generations.
              </p>
              <div className='d-flex gap-3 align-items-center flex-column flex-lg-row '>
                <a href='' className='thm-btn px-55'>
                  <b>Delivery</b>
                  <span></span>
                </a>
                <p>or</p>
                <a href='' className='thm-btn click-btn'>
                  <b>Click & Collect</b> <span></span>
                </a>
              </div>
            </div>
          </Col>
          <Col xl={5}>
            <img src={bannerbg} alt='' />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
