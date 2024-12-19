import React, { useEffect, useState } from "react";
import { useRootContext } from "../../Provider/Context";
import time from "../../assets/images/time.svg";
import deleteIcon from "../../assets/images/delete-light.png";
import { Link } from "react-router-dom";
const ShoppingModal = () => {
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
    showShopping,
    setShowShopping,
    toggleShopping,
    handleDeliveryToggle,
    itemName,
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
    <div className={`cart-popup ${showShopping ? " active" : ""}`}>
      <div
        onClick={toggleShopping}
        className='cart-popup__overlay cart-toggler'
      ></div>

      <div className='cart-popup__content shopping'>
        <div className='delivery-cart'>
          <h5>Vous venez de mettre dans votre panier le produit suivant :</h5>
          <h3 className='text-center my-5'>{itemName}</h3>
          <div className='d-flex justify-content-between'>
            <button className='thm-btn ' onClick={toggleShopping}>
              <b>Continuer mes achats</b> <span></span>
            </button>
            <Link to='/checkout' onClick={toggleShopping} className='thm-btn'>
              <b>Terminer ma commande</b> <span></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingModal;
