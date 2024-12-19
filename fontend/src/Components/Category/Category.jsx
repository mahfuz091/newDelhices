import { useEffect, useState } from "react";
import Masonry from "react-masonry-component";
import { Col, Container, Row } from "react-bootstrap";

import time from "../../assets/images/time.svg";

import { Link } from "react-router-dom";
import deleteIcon from "../../assets/images/delete.png";

import { useRootContext } from "../../Provider/Context";
// const { tabItems, tabContents } = categoryData;
const Category = ({ title }) => {
  const {
    control,
    setControl,
    cartItems,
    setCartItems,
    calculateSubtotal,
    changeQuantity,
    handleDelete,
    clickNcollect,
    handleDeliveryToggle,
    active,
    tabContents,
    category,
    setActive,
  } = useRootContext();

  const activeTabTitle =
    category?.find((tab) => tab._id === active)?.name || "";
  console.log("active title", activeTabTitle);
  const activeImage = category?.find((tab) => tab._id === active)?.image || "";
  const masonryOptions = {
    transitionDuration: 500,
  };

  const [isDelivery, setIsDelivery] = useState(true);

  const handleToggle = () => {
    setIsDelivery(!isDelivery);
  };

  const subtotal = calculateSubtotal();

  const handleCart = ({ _id, name, price }) => {
    // Initialize cart with existing items or an empty array if nothing is in local storage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = savedCart.findIndex((item) => item._id === _id);

    if (existingItemIndex !== -1) {
      // If the item exists, increase the quantity
      const updatedCart = [...savedCart];
      updatedCart[existingItemIndex].quantity += 1; // Increment quantity
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      setControl(!control);
    } else {
      // If the item doesn't exist, add it to the cart
      const newCartItem = {
        _id,
        name,
        price: parseFloat(price),
        quantity: 1,
      };
      const updatedCart = [...savedCart, newCartItem]; // Add new item to array
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      setControl(!control);
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, [control]);
  console.log(clickNcollect);

  return (
    <section className='category'>
      <Container>
        <h2 className='section-title'>{title}</h2>
        <ul className='category-tabs list-unstyled'>
          {category?.map(({ _id, name, image }, index) => (
            <li
              key={_id}
              onClick={() => setActive(_id)}
              className={`tab-btn ${active === _id ? "active-btn" : ""}`}
            >
              {name}
              <img src={`http://localhost:5000/${image}`} alt='title' />
            </li>
          ))}
        </ul>
        <Row className='gy-20'>
          <Col lg={8}>
            <div className='tabs-content'>
              <div>
                <h1 className='tabs-title'>
                  {activeTabTitle}
                  <img
                    src={`http://localhost:5000/${activeImage}`}
                    alt='title'
                  />
                </h1>
              </div>
              <Masonry options={masonryOptions} className='row gy-20'>
                {tabContents
                  .filter((tab) => tab.category === active)
                  .map(({ _id, name, image, details, price }) => (
                    <Col key={_id} lg={6}>
                      <div className='tab-card d-flex'>
                        {/* <Link to='' className='tab-cart__btn'>
                      <LuArrowUpRight color='#fff' />
                    </Link> */}
                        <div className='tab-card__img'>
                          <img
                            className='img-fluid'
                            // src={`http://localhost:5000/${image}`}
                            src={
                              new URL(
                                `../../assets/images/${image}`,
                                import.meta.url
                              ).href
                            }
                            alt=''
                          />
                        </div>

                        <div>
                          <h5 onClick={() => handleCart({ _id, name, price })}>
                            {name}
                          </h5>
                          <p className='desc'>{details}</p>
                          <p className='price'>${price}</p>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Masonry>
            </div>
          </Col>
          <Col lg={4}>
            <div className='delivery-cart'>
              <div className='toggle-label'>
                <span className='label-left'>Delivery</span>
                <div
                  className={`toggle-container ${
                    clickNcollect ? "active" : ""
                  }`}
                  onClick={handleDeliveryToggle}
                >
                  <div className='toggle-slider'></div>
                </div>
                <span className='label-right'>Click & Collect</span>
              </div>
              <div className='delivery-time'>
                <img src={time} alt='' />
                <p>20-30 min</p>
              </div>
              <div className='cart'>
                {cartItems?.map((product) => (
                  <div className='cart-item__card' key={product._id}>
                    <div>
                      <h5>
                        {product?.quantity} x {product?.name}
                      </h5>
                      <p className='price'>${product?.price?.toFixed(2)}</p>
                    </div>
                    <div className='d-flex flex-column align-items-center gap-3'>
                      <div className='quantity-btn__group'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          onClick={() =>
                            changeQuantity(product?._id, "decrease")
                          }
                        >
                          <path
                            d='M12.9675 8.78125H3.03125C2.59969 8.78125 2.25 8.43156 2.25 8C2.25 7.56844 2.59969 7.21875 3.03125 7.21875H12.9675C13.3991 7.21875 13.7488 7.56844 13.7488 8C13.7488 8.43156 13.3991 8.78125 12.9675 8.78125Z'
                            fill='black'
                          />
                        </svg>

                        <p>{product?.quantity}</p>

                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          onClick={() =>
                            changeQuantity(product?._id, "increase")
                          }
                        >
                          <path
                            d='M8 13.7488C7.56844 13.7488 7.21875 13.3991 7.21875 12.9675V3.03125C7.21875 2.59969 7.56844 2.25 8 2.25C8.43156 2.25 8.78125 2.59969 8.78125 3.03125V12.9675C8.78125 13.3991 8.43156 13.7488 8 13.7488Z'
                            fill='black'
                          />
                          <path
                            d='M12.9675 8.78125H3.03125C2.59969 8.78125 2.25 8.43156 2.25 8C2.25 7.56844 2.59969 7.21875 3.03125 7.21875H12.9675C13.3991 7.21875 13.7488 7.56844 13.7488 8C13.7488 8.43156 13.3991 8.78125 12.9675 8.78125Z'
                            fill='black'
                          />
                        </svg>
                      </div>
                      <button
                        className='delete-btn'
                        onClick={() => handleDelete(product._id)}
                      >
                        <img src={deleteIcon} alt='' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='subtotal'>
                <p>SubTotal</p>
                <p>${subtotal}</p>
              </div>
              <div className='total'>
                <p>Total</p>
                <p>${subtotal}</p>
              </div>
              {cartItems.length ? (
                <Link to='/checkout' className='thm-btn w-100'>
                  <b>Checkout</b> <span></span>
                </Link>
              ) : (
                <button className='thm-btn w-100' disabled>
                  <b>Checkout</b> <span></span>
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Category;
