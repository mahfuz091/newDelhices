import { Col, Container, Row } from "react-bootstrap";
import bannerbg from "../../assets/images/banner-bg.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className='banner'>
      <Container>
        <Row>
          <Col xl={7}>
            <div className='banner-content'>
              <h2 className='banner-title'>
                Rencontrer, manger et savourer le vrai goût
              </h2>
              <p className='banner-desc'>
                Le voyage culinaire de l&apos;Inde est une symphonie de saveurs,
                <br />
                d&apos;arômes et de traditions. Chaque plat raconte une histoire
                :
                <br />
                celle de cultures diverses, d&apos;épices anciennes et de
                <br />
                techniques séculaires, transmises de génération en génération.
              </p>
              <div className='d-flex gap-3 align-items-center justify-content-center justify-content-lg-start  '>
                <Link to='/reserve' className='thm-btn px-55'>
                  <b>Réservation</b>
                  <span></span>
                </Link>
                <p>ou</p>
                <Link to='/menu' className='thm-btn click-btn'>
                  <b>Cliquez et récupérez</b> <span></span>
                </Link>
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
