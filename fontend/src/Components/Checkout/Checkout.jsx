import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRootContext } from "../../Provider/Context";
import deleteIcon from "../../assets/images/delete.png";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";

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
  } = useRootContext();

  const [axiosSecure] = UseAxiosSecure();

  const subtotal = calculateSubtotal();
  const [startDate, setStartDate] = useState(new Date());
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    apartment: "",
    note: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, [control]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    let data = new FormData();

    // Append cart items (ensure cartItems is not empty)
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Convert cartItems to JSON and append
    data.append("items", JSON.stringify(cartItems));
    data.append("clickAndCollect", clickNcollect);

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
      data.append("note", orderDetails.note || "");
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
            error.response.data.msg || "There was an error placing your order."
          }`
        );
      } else {
        console.error("Error placing order:", error);
        alert("There was an error placing your order.");
      }
    }
  };

  return (
    <section className='checkout'>
      <Container>
        <h5 className='section-title'>Checkout</h5>
        <div className='checkoutContainer'>
          <Row className='gy-20'>
            <Col lg={8}>
              <div className='shipping-container'>
                <h6>Shipping Method</h6>
                <div className='d-flex justify-content-between align-items-center gap-3 shipping-btns'>
                  <button
                    className={`thm-btn w-100 ${
                      !clickNcollect ? "thm-btn__three" : "thm-btn__two"
                    }`}
                    onClick={() => clickNcollect && handleDeliveryToggle()}
                  >
                    <b>Delivery</b>
                  </button>
                  <p>or</p>
                  <button
                    className={`thm-btn w-100 ${
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
                  <h6>Payment</h6>
                  <input type='text' placeholder='Card Number' />
                  <button
                    className='thm-btn w-100 order-btn'
                    onClick={handleOrderSubmit}
                  >
                    <b>Place the Order</b>
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className='delivery-cart'>
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
                  <p>Subtotal</p>
                  <p>${subtotal}</p>
                </div>
                <div className='total'>
                  <p>Total</p>
                  <p>${subtotal}</p>
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
