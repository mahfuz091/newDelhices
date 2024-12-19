import { Col, Container, Row } from "react-bootstrap";
import product from "../../assets/images/product.png";
import { useState } from "react";

const tabItems = [
  {
    id: 1,
    title: "Description",
  },
  {
    id: 2,
    title: "Reviews",
  },
];

const MenuDetails = () => {
  const [active, setActive] = useState(1);
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
    <section className='menu-details'>
      <Container>
        <Row>
          <Col lg={6}>
            <div className='product-image'>
              <img src={product} alt='' />
            </div>
          </Col>
          <Col lg={6}>
            <div className='menu-details__content'>
              <h2 className='section-title'>POULET TIKKA BIRYANI</h2>
              <div className='d-flex align-items-center gap-2'>
                <div>{renderStars(3.5)}</div>
                <p className='m-0'>(1customer Review)</p>
              </div>
              <p className='price'>$170</p>
              <span className='line'></span>
              <p className='description'>
                Indian cuisine offers a rich and diverse array of flavors,
                textures, and spices. Are you interested in exploring
                traditional recipes, regional dishes, or a specific type of
                Indian cuisine.
              </p>
              <span className='line'></span>
              <div className='d-flex align-items-center gap-3'>
                <div className='d-flex align-items-center gap-1'>
                  <button className='minus'>
                    <i className='fas fa-minus'></i>
                  </button>
                  <div className='quantity'>1</div>
                  <button className='plus'>
                    <i className='fas fa-plus'></i>
                  </button>
                </div>
                <div>
                  <button className='thm-btn'>
                    <b>Add To Cart</b> <span></span>
                  </button>
                </div>
              </div>
              <p className='details-category'>
                Category: <span> POULET TIKKA BIRYANI </span>
              </p>
            </div>
          </Col>

          <div className='details-tab'>
            <ul className='details-tabs list-unstyled'>
              {tabItems.map(({ id, title }) => (
                <li
                  key={id}
                  onClick={() => setActive(id)}
                  className={`tab-btn ${active === id ? "active-btn" : ""}`}
                >
                  {title}
                </li>
              ))}
            </ul>
            <div className='tab-contents'>
              <div className={`tab-card ${active === 1 ? "active-tab" : ""}`}>
                <h2 className='section-title'>Description</h2>
                <p className='description one'>
                  Poulet Tikka Biryani is a flavorful fusion of two iconic
                  Indian dishes: Chicken Tikka and Biryani. In this dish,
                  marinated chicken (poulet is French for chicken) is first
                  prepared in the style of chicken tikka, where it&apos;s coated
                  in a rich mixture of yogurt, spices, and herbs like garam
                  masala, turmeric, cumin, coriander, garlic, and ginger, then
                  grilled or baked to perfection. The chicken tikka is then
                  combined with fragrant basmati rice cooked with aromatic
                  spices such as cinnamon, cloves, cardamom, and bay leaves.
                </p>
                <p className='description'>
                  The biryani is layered with the tender chicken tikka,
                  caramelized onions, and sometimes raisins or nuts for added
                  sweetness and crunch. It&apos;s all slow-cooked together,
                  allowing the flavors to meld beautifully. Often garnished with
                  fresh cilantro, mint, and a squeeze of lemon juice, Poulet
                  Tikka Biryani offers a rich, spicy, and fragrant culinary
                  experience, combining the smoky flavors of tikka with the
                  hearty, spiced rice of biryani. It’s usually served with
                  cooling raita or a side of yogurt and chutney for a balance of
                  flavors.
                </p>
              </div>
              <div className={`tab-card ${active === 2 ? "active-tab" : ""}`}>
                <h2 className='section-title'>Reviews</h2>
                <p className='description one'>
                  Poulet Tikka Biryani is a flavorful fusion of two iconic
                  Indian dishes: Chicken Tikka and Biryani. In this dish,
                  marinated chicken (poulet is French for chicken) is first
                  prepared in the style of chicken tikka, where it&apos;s coated
                  in a rich mixture of yogurt, spices, and herbs like garam
                  masala, turmeric, cumin, coriander, garlic, and ginger, then
                  grilled or baked to perfection. The chicken tikka is then
                  combined with fragrant basmati rice cooked with aromatic
                  spices such as cinnamon, cloves, cardamom, and bay leaves.
                </p>
                <p className='description'>
                  The biryani is layered with the tender chicken tikka,
                  caramelized onions, and sometimes raisins or nuts for added
                  sweetness and crunch. It&apos;s all slow-cooked together,
                  allowing the flavors to meld beautifully. Often garnished with
                  fresh cilantro, mint, and a squeeze of lemon juice, Poulet
                  Tikka Biryani offers a rich, spicy, and fragrant culinary
                  experience, combining the smoky flavors of tikka with the
                  hearty, spiced rice of biryani. It’s usually served with
                  cooling raita or a side of yogurt and chutney for a balance of
                  flavors.
                </p>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default MenuDetails;
