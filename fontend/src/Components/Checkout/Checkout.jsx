import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

import { useRootContext } from "../../Provider/Context";
import deleteIcon from "../../assets/images/delete.png";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import time from "../../assets/images/time.svg";

const Checkout = () => {
  const {
    cartItems,
    setCartItems,
    calculateSubtotal,
    changeQuantity,
    handleDelete,
    clickNcollect,
    handleDeliveryToggle,
    control,
    setControl,
    toggleSignIn,
    guestInfo,
    setGuestInfo,
    orderDetails,
    setOrderDetails,
  } = useRootContext();

  const [axiosSecure] = UseAxiosSecure();

  const subtotal = calculateSubtotal();
  const [startDate, setStartDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [user, setUser] = useState(null);

  console.log(guestInfo, "guest");

  // Generate time slots dynamically
  const generateTimeSlots = () => {
    const now = new Date();
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday
    const slots = [];

    // Add time slots for morning (except Friday)
    if (today !== 5) {
      const morningStart = new Date();
      morningStart.setHours(11, 30, 0, 0);

      const morningEnd = new Date();
      morningEnd.setHours(13, 45, 0, 0);

      let current = new Date(morningStart);

      while (current <= morningEnd) {
        if (current > now) {
          slots.push(current.toTimeString().slice(0, 5)); // Push valid slots
        }
        current.setMinutes(current.getMinutes() + 15); // Increment by 15 mins
      }
    }

    // Add time slots for evening
    const eveningStart = new Date();
    eveningStart.setHours(18, 30, 0, 0);

    const eveningEnd = new Date();
    eveningEnd.setHours(23, 0, 0, 0);

    let current = new Date(eveningStart);

    while (current <= eveningEnd) {
      if (current > now) {
        slots.push(current.toTimeString().slice(0, 5));
      }
      current.setMinutes(current.getMinutes() + 15); // Increment by 15 mins
    }

    setTimeSlots(slots);
  };

  useEffect(() => {
    generateTimeSlots();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    const user = JSON.parse(localStorage.getItem("user")) || null;
    setUser(user);
    // If no collection time is set, set the default to the first time slot
    if (!orderDetails.collectionTime && timeSlots.length > 0) {
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        collectionTime: timeSlots[0],
      }));
    }
  }, [control]);
  useEffect(() => {
    if (!orderDetails.collectionTime && timeSlots.length > 0) {
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        collectionTime: timeSlots[0],
      }));
    }
  }, [timeSlots]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    let data = new FormData();
    if (
      orderDetails.collectionTime &&
      !/^([01]\d|2[0-3]):([0-5]\d)$/.test(orderDetails.collectionTime)
    ) {
      toast.error("Invalid collection time! Use HH:mm format.");
      return;
    }

    if (!user && !orderDetails.name) {
      await toggleSignIn(); // Await if toggleSignIn is async
      return;
    }

    // Append cart items (ensure cartItems is not empty)
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Convert cartItems to JSON and append
    data.append("items", JSON.stringify(cartItems));

    // If not click-and-collect, append delivery details
    if (!clickNcollect) {
      if (
        !orderDetails.name ||
        !orderDetails.phone ||
        !orderDetails.email ||
        !orderDetails.street
      ) {
        toast.error("Please fill in all required delivery fields.");
        return;
      }

      data.append("name", orderDetails.name);
      data.append("phone", orderDetails.phone);
      data.append("email", orderDetails.email);
      data.append("street", orderDetails.street);
      data.append("apartment", orderDetails.apartment || "");
    }
    data.append("collectionTime", orderDetails.collectionTime || "");
    if (orderDetails.name) {
      data.append("name", orderDetails.name || "");
      data.append("email", orderDetails.email || "");
      data.append("phone", orderDetails.phone || "");
    }

    try {
      const response = await axiosSecure.post("/api/orders", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
      setOrderDetails({
        name: "",
        phone: "",
        email: "",
        street: "",
        apartment: "",
        note: "",
      });
      setStartDate(new Date());
      setControl(!control);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error placing order:", error.response.data);
        toast.error(
          `Error: ${
            error.response.data.message ||
            "There was an error placing your order."
          }`
        );
      } else {
        console.error("Error placing order:", error);
        toast.error(error.message);
      }
    }
  };

  console.log(orderDetails, "re");

  return (
    <section className='checkout'>
      <Container>
        <h5 className='section-title'>Vérifier</h5>
        <div className='checkoutContainer'>
          <Row className='gy-20'>
            <Col lg={8}>
              <div className='shipping-container'>
                <h6>Sur place</h6>
                <div className='d-flex justify-content-between align-items-start flex-column gap-3 shipping-btns'>
                  <h5>Choisissez une heure</h5>
                  <div className='d-flex flex-wrap gap-2'>
                    {timeSlots.map((time, index) => (
                      <div key={index}>
                        <input
                          id={`horaire_rdv${index}`}
                          name='collectionTime'
                          className='hide-radio-horaire'
                          type='radio'
                          value={time}
                          style={{ visibility: "hidden", display: "none" }}
                          defaultChecked={index === 0}
                          onChange={handleChange}
                        />
                        <label htmlFor={`horaire_rdv${index}`}>{time}</label>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`thm-btn w-100 d-none ${
                      !clickNcollect ? "thm-btn__three" : "thm-btn__two"
                    }`}
                    onClick={() => clickNcollect && handleDeliveryToggle()}
                  >
                    <b>Delivery</b>
                  </button>
                  <p className='d-none'>or</p>
                  <button
                    className={`thm-btn w-100 d-none ${
                      clickNcollect ? "thm-btn__three" : "thm-btn__two"
                    }`}
                    onClick={() => !clickNcollect && handleDeliveryToggle()}
                  >
                    <b>Click & Collect</b>
                  </button>
                </div>

                {!clickNcollect && (
                  <div>
                    <h6>Delivery Address</h6>
                    <form>
                      <Row className='gy-20'>
                        <Col lg={6}>
                          <input
                            type='text'
                            name='name'
                            placeholder='Full Name'
                            value={orderDetails.name}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col lg={6}>
                          <input
                            type='number'
                            name='phone'
                            placeholder='Phone'
                            value={orderDetails.phone}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col lg={6}>
                          <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={orderDetails.email}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col lg={6}>
                          <input
                            type='text'
                            name='street'
                            placeholder='Street'
                            value={orderDetails.street}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col lg={12}>
                          <input
                            type='text'
                            name='apartment'
                            placeholder='Apartment'
                            value={orderDetails.apartment}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col lg={12}>
                          <textarea
                            rows={5}
                            name='note'
                            placeholder='Note for Delivery Person'
                            value={orderDetails.note}
                            onChange={handleChange}
                          ></textarea>
                        </Col>
                      </Row>
                    </form>
                  </div>
                )}

                <div className='payment-container'>
                  <h6 className='d-none'>Payment</h6>
                  <input
                    type='text'
                    placeholder='Card Number'
                    className='d-none'
                  />
                  <button
                    className='thm-btn w-100 order-btn'
                    onClick={handleOrderSubmit}
                  >
                    <b>Passer la commande</b>
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className='delivery-cart'>
                <div className='toggle-label'>
                  <span className='label-left d-none'>Delivery</span>

                  <span className='label-right'>Click & Collect</span>
                </div>
                <div className='delivery-time'>
                  <img src={time} alt='' />
                  <p>20-30 min</p>
                </div>
                <div className='cart'>
                  {cartItems?.map((product) => (
                    <div key={product._id}>
                      <div className='cart-item__card'>
                        <div>
                          <h5>
                            {product?.quantity} x {product?.name}
                          </h5>
                          <p className='price'>
                            {product?.price?.toFixed(2)} €
                          </p>
                        </div>
                        {/* Quantity Control and Delete */}
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

                      {/* Check if product has option or optionsTwo */}
                      {product?.option && (
                        <div className='cart-item__card ps-5'>
                          <h5> {product.option.title}</h5>

                          <p className='price'>
                            +
                            {product.sauces
                              .reduce((total, sauce) => total + sauce.price, 0)
                              .toFixed(2)}{" "}
                            €
                          </p>
                        </div>
                      )}
                      {product?.optionsTwo && (
                        <div className='cart-item__card ps-5'>
                          <h5> {product.optionsTwo.title}</h5>
                          {product.optionsTwo.price && (
                            <p className='price'>
                              +{parseFloat(product.optionsTwo.price).toFixed(2)}{" "}
                              €
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className='subtotal'>
                  <p>SubTotal</p>
                  <p>{subtotal} €</p>
                </div>
                <div className='total'>
                  <p>Total</p>
                  <p>{subtotal} €</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Checkout;
