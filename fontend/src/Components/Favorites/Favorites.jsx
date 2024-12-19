import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRootContext } from "../../Provider/Context";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { tabContents } = useRootContext();
  const getRandomItems = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomTabContents = getRandomItems(tabContents, 8);
  return (
    <section className='favorites'>
      <Container>
        <h3 className='section-title'>
          Les favoris des fans: <br />
          Plats délicieux de notre cuisine
        </h3>
        <p className='sec-description'>
          Profitez des saveurs les plus appréciées par nos clients
        </p>

        <div className='favorite-cards'>
          <Row className='gy-20'>
            {randomTabContents?.map(({ id, image, name, details, price }) => (
              <Col md={6} lg={4} xl={3} key={id}>
                <div className='favorite-card'>
                  <div className='image'>
                    <img
                      className='img-fluid'
                      src={
                        new URL(`../../assets/images/${image}`, import.meta.url)
                          .href
                      }
                      alt=''
                    />
                  </div>
                  <div className='content'>
                    <h5>{name}</h5>
                    <p>{details}</p>
                    <p className='price'>{price} €</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className='text-center mt-5'>
          <Link to='menu' className='thm-btn'>
            <b>Voir tous les aliments</b> <span></span>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Favorites;
