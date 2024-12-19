import React, { useEffect, useState } from "react";
import { useRootContext } from "../../Provider/Context";
import time from "../../assets/images/time.svg";
import deleteIcon from "../../assets/images/delete-light.png";
import { Link } from "react-router-dom";
const CartModal = () => {
  const {
    showCart,
    toggleCart,
    control,
    setControl,
    cartItems,
    setCartItems,
    calculateSubtotal,
    changeQuantity,
    handleDelete,
    clickNcollect,

    handleDeliveryToggle,
  } = useRootContext();

  const [isDelivery, setIsDelivery] = useState(true);

  const handleToggle = () => {
    setIsDelivery(!isDelivery);
  };

  const subtotal = calculateSubtotal();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, [control]);

  return (
    <div className={`cart-popup ${showCart ? " active" : ""}`}>
      <div
        onClick={toggleCart}
        className='cart-popup__overlay cart-toggler'
      ></div>

      <div className='cart-popup__content'>
        <div className='delivery-cart'>
          <div className='toggle-label'>
            <span className='label-left d-none'>Delivery</span>
            <div
              className={`toggle-container d-none ${
                !clickNcollect ? "" : "active"
              }`}
              onClick={handleDeliveryToggle}
            >
              <div className='toggle-slider d-none'></div>
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
                    {product?.quantity} x {product.name}
                  </h5>
                  <p className='price'>${product?.price.toFixed(2)}</p>
                </div>
                <div className='d-flex flex-column align-items-center gap-3'>
                  <div className='quantity-btn__group'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      onClick={() => changeQuantity(product?._id, "decrease")}
                    >
                      <path
                        d='M12.9675 8.78125H3.03125C2.59969 8.78125 2.25 8.43156 2.25 8C2.25 7.56844 2.59969 7.21875 3.03125 7.21875H12.9675C13.3991 7.21875 13.7488 7.56844 13.7488 8C13.7488 8.43156 13.3991 8.78125 12.9675 8.78125Z'
                        fill='black'
                      />
                    </svg>

                    <p> {product?.quantity}</p>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      onClick={() => changeQuantity(product?._id, "increase")}
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
          <Link to='/checkout' onClick={toggleCart} className='thm-btn w-100'>
            <b>Vérifier</b> <span></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
