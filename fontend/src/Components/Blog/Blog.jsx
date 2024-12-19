import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { blogData } from "./BlogData";

import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { Link } from "react-router-dom";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState();

  const getBlog = async () => {
    try {
      const res = await axiosPublic.get("/api/blog");
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlog();
  }, []);

  const truncateDescription = (text = "", wordLimit = 19) => {
    const words = text.split(" ");
    console.log(words.length);

    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };

  return (
    <section className='blog'>
      <Container>
        <h2 className='section-title'>Blog</h2>
        <div className='blog-cards'>
          <Row className='g-30'>
            {blogs?.map(({ _id, title, description, image }, index) => (
              <Col lg={4} key={_id}>
                <div className='blog-card'>
                  {/* <img className='img-fluid w-100' src={image} alt={title} /> */}
                  <Link to={`/blog/${_id}`}>
                    <img
                      className=''
                      src={
                        new URL(`../../assets/images/${image}`, import.meta.url)
                          .href
                      }
                      alt=''
                    />
                  </Link>

                  <div className='blog-card__content'>
                    <Link to={`/blog/${_id}`}>
                      <h5 className='blog-card__title'>{title}</h5>
                    </Link>

                    <p className='blog-card__desc'>
                      {truncateDescription(description)}
                    </p>
                    <Link to={`/blog/${_id}`} className='read-btn'>
                      Read More
                    </Link>
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
