import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from "../../assets/images/page-header.png";

const PageHeader = ({ subTitle, title }) => {
  return (
    <section className='page-header'>
      <Container>
        <Row className='align-items-center'>
          <Col lg={8}>
            <div className='page-header__content'>
              <ul className='tolak-breadcrumb list-unstyled'>
                <li>
                  <Link href='/'>Home</Link>
                </li>
                <li>
                  <span>{subTitle}</span>
                </li>
              </ul>
              <h2 className='page-header__title'>{title}</h2>
            </div>
          </Col>
          <Col lg={4}>
            <div
              className='page-header__layer wow fadeInUp aos-init aos-animate'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <img src={image} alt='' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PageHeader;
