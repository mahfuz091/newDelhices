import { Col, Container, Row } from "react-bootstrap";
import chef from "../../assets/images/chef.png";

const MeetOurChef = () => {
  return (
    <section className='meet-chef'>
      <Container>
        <Row>
          <Col lg={6}>
            <div className='chef-content'>
              <h2 className='section-title'>Rencontrez notre chef spécial</h2>
              <p className='section-desc'>
                “ J&apos;ai eu le plaisir de dîner chez Foodi hier soir, et je
                suis encore ravi de cette expérience ! L&apos;attention portée
                aux détails dans la présentation et le service était impeccable
                J&apos;ai eu le plaisir de dîner chez Foodi hier soir, et je
                suis encore ravi de cette expérience ! L&apos;attention portée
                aux détails dans la présentation et le service était impeccable
                J&apos;ai eu le plaisir de dîner chez Foodi hier soir, et je
                suis encore ravi de cette expérience ! L&apos;attention portée
                aux détails dans la présentation et le service était impeccable
                et je suis encore ravi de cette expérience ! L&apos;attention
                portée aux détails dans la présentation et le service était
                impeccable ””
              </p>
              <div className='chef-meta__author'>
                <h5 className='chef-meta__author--name'>Henry Laboo</h5>
                <p className='chef-meta__author--text'>Master Chef</p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className='chef-image'>
              <img src={chef} alt='' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MeetOurChef;
