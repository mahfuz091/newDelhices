import { Accordion, Col, Container, Row } from "react-bootstrap";
import mission1 from "../../assets/images/mission-1.png";
import mission2 from "../../assets/images/mission-2.png";
import mission3 from "../../assets/images/mission-3.png";

const Mission = () => {
  return (
    <section className='mission'>
      <Container>
        <h2 className='section-title text-center'>
          Notre mission et notre vision
        </h2>
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
                          Chez New Delhies, notre mission est de créer des
                          expériences culinaires exceptionnelles en proposant
                          des plats de haute qualité, frais et savoureux qui
                          célèbrent les meilleurs ingrédients. Nous nous
                          engageons à:
                        </p>
                        <ul>
                          <li>
                            Offrant une atmosphère accueillante et confortable
                            où les invités peuvent profiter de repas mémorables
                            en famille et entre amis.
                          </li>
                          <li>
                            Offrir un excellent service qui reflète notre
                            passion pour l’hospitalité et le souci du détail.
                          </li>
                          <li>
                            Soutenir les agriculteurs et les fournisseurs locaux
                            en s&apos;approvisionnant dans la mesure du possible
                            en ingrédients durables, de saison et biologiques.
                          </li>
                          <li>
                            Nous innovons continuellement notre menu pour offrir
                            des expériences culinaires passionnantes et variées
                            à nos clients.
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
                          Chez New Delhies, notre mission est de créer des
                          expériences culinaires exceptionnelles en proposant
                          des plats de haute qualité, frais et savoureux qui
                          célèbrent les meilleurs ingrédients. Nous nous
                          engageons à:
                        </p>
                        <ul>
                          <li>
                            Offrant une atmosphère accueillante et confortable
                            où les invités peuvent profiter de repas mémorables
                            en famille et entre amis.
                          </li>
                          <li>
                            Offrir un excellent service qui reflète notre
                            passion pour l’hospitalité et le souci du détail.
                          </li>
                          <li>
                            Soutenir les agriculteurs et les fournisseurs locaux
                            en s&apos;approvisionnant dans la mesure du possible
                            en ingrédients durables, de saison et biologiques.
                          </li>
                          <li>
                            Nous innovons continuellement notre menu pour offrir
                            des expériences culinaires passionnantes et variées
                            à nos clients.
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
