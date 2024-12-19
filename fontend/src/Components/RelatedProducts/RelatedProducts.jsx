import { LuArrowUpRight } from "react-icons/lu";
import TinySlider from "tiny-slider-react";
import image1 from "../../assets/images/Mask group (1).png";
import { Container } from "react-bootstrap";

const RelatedProducts = () => {
  const settings = {
    loop: true,
    autoplay: false,
    mouseDrag: true,
    items: 1,
    gutter: 20,
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
        items: 4,
      },
    },
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        // Full red stars for 4.0
        stars.push(
          <span key={i} style={{ color: "#FFAD3D", fontSize: "14px" }}>
            <i className='fas fa-star'></i>
          </span>
        );
      } else if (i === Math.ceil(rating)) {
        // Half black star for 4.5
        stars.push(
          <span key={i} style={{ color: "#FFAD3D", fontSize: "14px" }}>
            <i className='fas fa-star-half-stroke'></i>
          </span>
        );
      } else {
        // Grey stars for the remaining empty stars
        stars.push(
          <span key={i} style={{ color: "#B4B4B4", fontSize: "14px" }}>
            <i className='fa-regular fa-star'></i>
          </span>
        );
      }
    }
    return stars;
  };
  return (
    <section className='related-products'>
      <Container>
        <h2 className='section-title'>Related Food</h2>
        <TinySlider settings={settings}>
          <div className='item'>
            <div className='tab-card'>
              <a href='' className='tab-cart__btn'>
                <LuArrowUpRight color='#fff' />
              </a>
              <img className='img-fluid' src={image1} alt='' />

              <h5>title</h5>
              <p className='desc'>tag</p>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='price'>$170</p>
                <div>{renderStars(3.5)}</div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='tab-card'>
              <a href='' className='tab-cart__btn'>
                <LuArrowUpRight color='#fff' />
              </a>
              <img className='img-fluid' src={image1} alt='' />

              <h5>title</h5>
              <p className='desc'>tag</p>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='price'>$170</p>
                <div>{renderStars(3.5)}</div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='tab-card'>
              <a href='' className='tab-cart__btn'>
                <LuArrowUpRight color='#fff' />
              </a>
              <img className='img-fluid' src={image1} alt='' />

              <h5>title</h5>
              <p className='desc'>tag</p>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='price'>$170</p>
                <div>{renderStars(3.5)}</div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='tab-card'>
              <a href='' className='tab-cart__btn'>
                <LuArrowUpRight color='#fff' />
              </a>
              <img className='img-fluid' src={image1} alt='' />

              <h5>title</h5>
              <p className='desc'>tag</p>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='price'>$170</p>
                <div>{renderStars(3.5)}</div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='tab-card'>
              <a href='' className='tab-cart__btn'>
                <LuArrowUpRight color='#fff' />
              </a>
              <img className='img-fluid' src={image1} alt='' />

              <h5>title</h5>
              <p className='desc'>tag</p>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='price'>$170</p>
                <div>{renderStars(3.5)}</div>
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='tab-card'>
              <a href='' className='tab-cart__btn'>
                <LuArrowUpRight color='#fff' />
              </a>
              <img className='img-fluid' src={image1} alt='' />

              <h5>title</h5>
              <p className='desc'>tag</p>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='price'>$170</p>
                <div>{renderStars(3.5)}</div>
              </div>
            </div>
          </div>
        </TinySlider>
      </Container>
    </section>
  );
};

export default RelatedProducts;
