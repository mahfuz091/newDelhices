import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import { blogData } from "./BlogData";

const Blog = () => {
  return (
    <section className='blog'>
      <Container>
        <h2 className='section-title'>Blog</h2>
        <div className='blog-cards'>
          <Row className='g-30'>
            {blogData.map(({ title, description, image }, index) => (
              <Col lg={4} key={index}>
                <div className='blog-card'>
                  <img className='img-fluid' src={image} alt={title} />
                  <div className='blog-card__content'>
                    <h5 className='blog-card__title'>{title}</h5>
                    <p className='blog-card__desc'>{description}</p>
                    <a href=''>Read More</a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Blog;
