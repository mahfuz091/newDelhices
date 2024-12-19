import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image1 from "../../assets/images/01.png";
import image2 from "../../assets/images/02.png";
import image3 from "../../assets/images/03.png";
import image4 from "../../assets/images/04.png";

const data = [
  {
    id: 1,
    image: image1,
    title: "Cheese Nan",
    des: "It is a layered dish of fragrant basmati rice, tender marinated chicken.",
    price: 14.9,
  },
  {
    id: 2,
    image: image2,
    title: "Cheese Nan",
    des: "It is a layered dish of fragrant basmati rice, tender marinated chicken.",
    price: 14.9,
  },
  {
    id: 3,
    image: image3,
    title: "Cheese Nan",
    des: "It is a layered dish of fragrant basmati rice, tender marinated chicken.",
    price: 14.9,
  },
  {
    id: 4,
    image: image4,
    title: "Cheese Nan",
    des: "It is a layered dish of fragrant basmati rice, tender marinated chicken.",
    price: 14.9,
  },
];

const Favorites = () => {
  return (
    <section className='favorites'>
      <Container>
        <h3 className='section-title'>
          Fan Favorites: <br />
          Delightful Dishes from Our Kitchen
        </h3>
        <p className='sec-description'>
          Enjoy the Flavors Most Appreciated by Our Customers
        </p>

        <div className='favorite-cards'>
          <Row>
            {data.map(({ id, image, title, des, price }) => (
              <Col lg={3} key={id}>
                <div className='favorite-card'>
                  <div className='image'>
                    <img className='img-fluid' src={image} alt='' />
                  </div>
                  <div className='content'>
                    <h5>{title}</h5>
                    <p>{des}</p>
                    <p className='price'>${price}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className='text-center mt-5'>
          <button className='thm-btn'>
            <b>See All Food</b> <span></span>
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Favorites;
