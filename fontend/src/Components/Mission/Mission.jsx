import { Accordion, Col, Container, Row } from "react-bootstrap";
import mission1 from "../../assets/images/mission-1.png";
import mission2 from "../../assets/images/mission-2.png";
import mission3 from "../../assets/images/mission-3.png";

const Mission = () => {
  return (
    <section className='mission'>
      <Container>
        <h2 className='section-title text-center'>Our Mission & Vision</h2>
        <Row className='g-50'>
          <Col lg={6}>
            <Row className='mission-images'>
              <Col sm={12} className='img-1'>
                <img className='img-fluid' src={mission1} alt='mission' />
              </Col>
              <Col sm={6} className='img-2'>
                <img className='img-fluid' src={mission2} alt='mission' />
              </Col>
              <Col sm={6} className='img-3'>
                <img className='img-fluid' src={mission3} alt='mission' />
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <div className='mission-content'>
              <div className='mission-accordion'>
                <Accordion defaultActiveKey='1'>
                  <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                      Mission
                      <span className='accrodion-title__icon'></span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className='inner'>
                        <p>
                          At New Delhies, our mission is to create exceptional
                          dining experiences by offering high-quality, fresh,
                          and flavorful dishes that celebrate the best
                          ingredients. We are committed to:
                        </p>
                        <ul>
                          <li>
                            Providing a welcoming and comfortable atmosphere
                            where guests can enjoy memorable meals with family
                            and friends.
                          </li>
                          <li>
                            Delivering excellent service that reflects our
                            passion for hospitality and attention to detail.
                          </li>
                          <li>
                            Supporting local farmers and suppliers by sourcing
                            sustainable, seasonal, and organic ingredients
                            whenever possible.
                          </li>
                          <li>
                            Continuously innovating our menu to bring exciting
                            and diverse culinary experiences to our guests.
                          </li>
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey='1'>
                    <Accordion.Header>
                      Vission
                      <span className='accrodion-title__icon'></span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className='inner'>
                        <p>
                          At New Delhies, our mission is to create exceptional
                          dining experiences by offering high-quality, fresh,
                          and flavorful dishes that celebrate the best
                          ingredients. We are committed to:
                        </p>
                        <ul>
                          <li>
                            Providing a welcoming and comfortable atmosphere
                            where guests can enjoy memorable meals with family
                            and friends.
                          </li>
                          <li>
                            Delivering excellent service that reflects our
                            passion for hospitality and attention to detail.
                          </li>
                          <li>
                            Supporting local farmers and suppliers by sourcing
                            sustainable, seasonal, and organic ingredients
                            whenever possible.
                          </li>
                          <li>
                            Continuously innovating our menu to bring exciting
                            and diverse culinary experiences to our guests.
                          </li>
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Mission;
