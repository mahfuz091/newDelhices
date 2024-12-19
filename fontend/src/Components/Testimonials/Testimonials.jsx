import TinySlider from "tiny-slider-react";
import "tiny-slider/dist/tiny-slider.css";
import quote from "../../assets/images/quote.svg";
import author from "../../assets/images/author.png";
import { Container } from "react-bootstrap";
const settings = {
  loop: true,
  autoplay: true,
  mouseDrag: true,
  items: 1,
  gutter: 30,

  nav: true,
  controls: false,
  autoplayTimeout: 5000,
  autoplayButtonOutput: false,
  responsive: {
    640: {
      items: 1,
    },
    900: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  },
};
const Testimonials = () => {
  return (
    <section className='testimonials'>
      <Container>
        <div className='sec-header'>
          <h2 className='section-title'>What Clients Say?</h2>
          <p>
            Authentic flavors that take you straight to India! Authentic flavors
            that <br /> take you straight to India!
          </p>
        </div>
        <TinySlider settings={settings}>
          <div className='item'>
            <div className='testimonial-card'>
              <img src={quote} alt='' />
              <p>
                The Chicken Biryani and Paneer Butter Masala are the best I’ve
                ever had! Each bite brings back memories of home. The spices are
                perfectly balanced, and the quality is exceptional..
              </p>
              <div className='testimonial-card__meta__author'>
                <img src={author} alt='' />
                <div>
                  <a href='#' className='meta__name'>
                    Priya S.
                  </a>
                  <p>New York</p>
                </div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='testimonial-card'>
              <img src={quote} alt='' />
              <p>
                The Chicken Biryani and Paneer Butter Masala are the best I’ve
                ever had! Each bite brings back memories of home. The spices are
                perfectly balanced, and the quality is exceptional..
              </p>
              <div className='testimonial-card__meta__author'>
                <img src={author} alt='' />
                <div>
                  <a href='#' className='meta__name'>
                    Priya S.
                  </a>
                  <p>New York</p>
                </div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='testimonial-card'>
              <img src={quote} alt='' />
              <p>
                The Chicken Biryani and Paneer Butter Masala are the best I’ve
                ever had! Each bite brings back memories of home. The spices are
                perfectly balanced, and the quality is exceptional..
              </p>
              <div className='testimonial-card__meta__author'>
                <img src={author} alt='' />
                <div>
                  <a href='#' className='meta__name'>
                    Priya S.
                  </a>
                  <p>New York</p>
                </div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='testimonial-card'>
              <img src={quote} alt='' />
              <p>
                The Chicken Biryani and Paneer Butter Masala are the best I’ve
                ever had! Each bite brings back memories of home. The spices are
                perfectly balanced, and the quality is exceptional..
              </p>
              <div className='testimonial-card__meta__author'>
                <img src={author} alt='' />
                <div>
                  <a href='#' className='meta__name'>
                    Priya S.
                  </a>
                  <p>New York</p>
                </div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='testimonial-card'>
              <img src={quote} alt='' />
              <p>
                The Chicken Biryani and Paneer Butter Masala are the best I’ve
                ever had! Each bite brings back memories of home. The spices are
                perfectly balanced, and the quality is exceptional..
              </p>
              <div className='testimonial-card__meta__author'>
                <img src={author} alt='' />
                <div>
                  <a href='#' className='meta__name'>
                    Priya S.
                  </a>
                  <p>New York</p>
                </div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='testimonial-card'>
              <img src={quote} alt='' />
              <p>
                The Chicken Biryani and Paneer Butter Masala are the best I’ve
                ever had! Each bite brings back memories of home. The spices are
                perfectly balanced, and the quality is exceptional..
              </p>
              <div className='testimonial-card__meta__author'>
                <img src={author} alt='' />
                <div>
                  <a href='#' className='meta__name'>
                    Priya S.
                  </a>
                  <p>New York</p>
                </div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='testimonial-card'>
              <img src={quote} alt='' />
              <p>
                The Chicken Biryani and Paneer Butter Masala are the best I’ve
                ever had! Each bite brings back memories of home. The spices are
                perfectly balanced, and the quality is exceptional..
              </p>
              <div className='testimonial-card__meta__author'>
                <img src={author} alt='' />
                <div>
                  <a href='#' className='meta__name'>
                    Priya S.
                  </a>
                  <p>New York</p>
                </div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='testimonial-card'>
              <img src={quote} alt='' />
              <p>
                The Chicken Biryani and Paneer Butter Masala are the best I’ve
                ever had! Each bite brings back memories of home. The spices are
                perfectly balanced, and the quality is exceptional..
              </p>
              <div className='testimonial-card__meta__author'>
                <img src={author} alt='' />
                <div>
                  <a href='#' className='meta__name'>
                    Priya S.
                  </a>
                  <p>New York</p>
                </div>
              </div>
            </div>
          </div>
        </TinySlider>
      </Container>
    </section>
  );
};

export default Testimonials;
