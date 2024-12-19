import { Col, Container, Row } from "react-bootstrap";
import experience from "../../assets/images/experience.png";
import { Link } from "react-router-dom";

const Experience = () => {
  return (
    <section className='experience-section'>
      <Container>
        <Row className='gy-20'>
          <Col lg={6}>
            <div className='sec-image'>
              <img
                data-aos='fade-right'
                data-aos-duration='1500'
                className='img-fluid'
                src={experience}
                alt=''
              />
            </div>
          </Col>
          <Col lg={6}>
            <h2 className='section-title'>
              Experience Indian food&apos;s flavors
            </h2>
            <p className='sec-description'>
              Indian cuisine offers a rich and diverse array of flavors,
              textures, and spices. Are you interested in exploring traditional
              recipes, regional dishes, or a specific type of Indian cuisine
              (e.g., street food, vegetarian, or fusion)? Let me know what
              you&apos;re excited to explore, and I can help curate recipes,
              techniques, or tips for mastering those flavors!
            </p>
            <Link to='/' className='thm-btn'>
              <b>Order Now</b>
              <span></span>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Experience;
