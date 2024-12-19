import { Col, Container, Row } from "react-bootstrap";
import chef from "../../assets/images/chef.png";

const MeetOurChef = () => {
  return (
    <section className='meet-chef'>
      <Container>
        <Row>
          <Col lg={6}>
            <div className='chef-content'>
              <h2 className='section-title'>Meet Our Special Chef</h2>
              <p className='section-desc'>
                “I had the pleasure of dining at Foodi last night, and I&apos;m
                still raving about the experience! The attention to detail in
                presentation and service was impeccable I had the pleasure of
                dining at Foodi last night, and I&apos;m still raving about the
                experience! The attention to detail in presentation and service
                was impeccable I had the pleasure of dining at Foodi last night,
                and I&apos;m still raving about the experience! The attention to
                detail in presentation and service was impeccableand I&apos;m
                still raving about the experience! The attention to detail in
                presentation and service was impeccable””
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
