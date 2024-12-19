import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// Example products array
const products = [
  {
    _id: "67086087dd8834c70cf7100a",
    image: "image",
    name: "Poulet Biriyani",
    description:
      "It is a layered dish of fragrant basmati rice, tender marinated chicken.",
    details: `Poulet Tikka Biryani is a flavorful fusion of two iconic Indian dishes: Chicken Tikka and Biryani. In this dish, marinated chicken (poulet is French for chicken) is first prepared in the style of chicken tikka, where it's coated in a rich mixture of yogurt, spices, and herbs like garam masala, turmeric, cumin, coriander, garlic, and ginger, then grilled or baked to perfection. The chicken tikka is then combined with fragrant basmati rice cooked with aromatic spices such as cinnamon, cloves, cardamom, and bay leaves.\n\nThe biryani is layered with the tender chicken tikka, caramelized onions, and sometimes raisins or nuts for added sweetness and crunch. It's all slow-cooked together, allowing the flavors to meld beautifully. Often garnished with fresh cilantro, mint, and a squeeze of lemon juice.`,
    price: 170,
    category: "67085b400f3b412a8d34719f",
  },
  {
    _id: "67086087dd8834c70cf7100a",
    image: "image",
    name: "Poulet Biriyani",
    description:
      "It is a layered dish of fragrant basmati rice, tender marinated chicken.",
    details: `Poulet Tikka Biryani is a flavorful fusion of two iconic Indian dishes: Chicken Tikka and Biryani. In this dish, marinated chicken (poulet is French for chicken) is first prepared in the style of chicken tikka, where it's coated in a rich mixture of yogurt, spices, and herbs like garam masala, turmeric, cumin, coriander, garlic, and ginger, then grilled or baked to perfection. The chicken tikka is then combined with fragrant basmati rice cooked with aromatic spices such as cinnamon, cloves, cardamom, and bay leaves.\n\nThe biryani is layered with the tender chicken tikka, caramelized onions, and sometimes raisins or nuts for added sweetness and crunch. It's all slow-cooked together, allowing the flavors to meld beautifully. Often garnished with fresh cilantro, mint, and a squeeze of lemon juice.`,
    price: 170,
    category: "67085b400f3b412a8d34719f",
  },
  // You can add more products as needed
];
const ShoppingCart = () => {
  // Initial state for quantities (assuming 1 as default)
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product._id] = 1; // Initialize each product quantity to 1
      return acc;
    }, {})
  );

  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    setQuantities((prevQuantities) => {
      const updatedQuantity = prevQuantities[id] + change;
      return {
        ...prevQuantities,
        [id]: Math.max(1, updatedQuantity), // Ensure quantity is at least 1
      };
    });
  };

  // Calculate the subtotal
  const calculateSubtotal = () => {
    return products.reduce((acc, product) => {
      return acc + product.price * quantities[product._id];
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shoppingCharge = 0;
  const tax = 0;
  const discount = 0;
  const total = subtotal + shoppingCharge + tax;
  return (
    <section className='cart-section'>
      <Container>
        <h2 className='section-title'>Shopping Cart</h2>
        <Row>
          <Col lg={8}>
            <div className='cart-left'>
              <div className='table-responsive'>
                <table>
                  <thead>
                    <tr>
                      <th>Details</th>
                      <th className='text-center'>Quantity</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img src='' alt='' />
                          <div>
                            <h5>POULET TIKKA BIRYANI</h5>
                            <p>Indian cuisine offers a rich</p>
                          </div>
                        </td>
                        <td>
                          <div className='quantity-btn__group'>
                            <button
                              onClick={() =>
                                handleQuantityChange(product._id, -1)
                              }
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                              >
                                <path
                                  d='M19.4513 13.1719H4.54688C3.89953 13.1719 3.375 12.6473 3.375 12C3.375 11.3527 3.89953 10.8281 4.54688 10.8281H19.4513C20.0986 10.8281 20.6231 11.3527 20.6231 12C20.6231 12.6473 20.0986 13.1719 19.4513 13.1719Z'
                                  fill='black'
                                />
                              </svg>
                            </button>
                            <p>{quantities[product._id]}</p>
                            <button
                              onClick={() =>
                                handleQuantityChange(product._id, 1)
                              }
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                              >
                                <path
                                  d='M12 20.6231C11.3527 20.6231 10.8281 20.0986 10.8281 19.4513V4.54688C10.8281 3.89953 11.3527 3.375 12 3.375C12.6473 3.375 13.1719 3.89953 13.1719 4.54688V19.4513C13.1719 20.0986 12.6473 20.6231 12 20.6231Z'
                                  fill='black'
                                />
                                <path
                                  d='M19.4513 13.1719H4.54688C3.89953 13.1719 3.375 12.6473 3.375 12C3.375 11.3527 3.89953 10.8281 4.54688 10.8281H19.4513C20.0986 10.8281 20.6231 11.3527 20.6231 12C20.6231 12.6473 20.0986 13.1719 19.4513 13.1719Z'
                                  fill='black'
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td>
                          <p className='price'>
                            ${product.price * quantities[product._id]}
                          </p>
                        </td>
                        <td>
                          <button className='del-btn'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='34'
                              height='34'
                              viewBox='0 0 34 34'
                              fill='none'
                            >
                              <path
                                d='M27.5275 2.78812H6.47466C5.49828 2.7917 4.56292 3.18116 3.87251 3.87157C3.1821 4.56198 2.79265 5.49734 2.78906 6.47372V9.52012C2.78906 9.70047 2.86071 9.87343 2.98823 10.001C3.11575 10.1285 3.28872 10.2001 3.46906 10.2001H5.79466V27.5265C5.7874 28.0192 5.87863 28.5083 6.06299 28.9652C6.24734 29.4221 6.52112 29.8376 6.86824 30.1872C7.21536 30.5369 7.62883 30.8137 8.08438 31.0013C8.53993 31.189 9.02838 31.2838 9.52106 31.2801H24.4811C25.4574 31.2765 26.3928 30.8871 27.0832 30.1967C27.7736 29.5063 28.1631 28.5709 28.1667 27.5945V10.1593H30.4923C30.5869 10.1748 30.6837 10.17 30.7764 10.1454C30.869 10.1208 30.9554 10.0769 31.0299 10.0165C31.1044 9.95616 31.1653 9.88073 31.2086 9.79518C31.2519 9.70963 31.2766 9.61589 31.2811 9.52012V6.47372C31.2793 5.98447 31.1805 5.50042 30.9904 5.04961C30.8003 4.5988 30.5227 4.19017 30.1736 3.84739C29.8245 3.50461 29.4109 3.23449 28.9566 3.05266C28.5024 2.87084 28.0167 2.78092 27.5275 2.78812ZM26.8475 27.5265C26.8548 27.8406 26.7988 28.1529 26.6828 28.4448C26.5668 28.7367 26.3932 29.0023 26.1724 29.2257C25.9515 29.4491 25.688 29.6257 25.3974 29.745C25.1068 29.8643 24.7952 29.9239 24.4811 29.9201H9.52106C8.90538 29.9166 8.31592 29.6704 7.88056 29.235C7.4452 28.7997 7.19903 28.2102 7.19546 27.5945V10.1593H26.8475V27.5265ZM29.9211 8.79932H4.14906V6.47372C4.15263 5.85803 4.3988 5.26858 4.83416 4.83322C5.26952 4.39785 5.85898 4.15169 6.47466 4.14812H27.5275C27.8381 4.14089 28.147 4.1956 28.4362 4.30907C28.7254 4.42253 28.9891 4.59247 29.212 4.80896C29.4348 5.02546 29.6122 5.28417 29.734 5.57C29.8557 5.85583 29.9193 6.16305 29.9211 6.47372V8.79932Z'
                                fill='#FF2626'
                              />
                              <path
                                d='M12.4862 25.2008C12.6665 25.2008 12.8395 25.1292 12.967 25.0017C13.0946 24.8741 13.1662 24.7012 13.1662 24.5208V15.4904C13.1662 15.3101 13.0946 15.1371 12.967 15.0096C12.8395 14.8821 12.6665 14.8104 12.4862 14.8104C12.3069 14.8139 12.136 14.8867 12.0092 15.0134C11.8824 15.1402 11.8097 15.3112 11.8062 15.4904V24.48C11.8026 24.5722 11.8174 24.6643 11.8497 24.7507C11.8821 24.8371 11.9314 24.9162 11.9947 24.9833C12.0581 25.0504 12.1342 25.1043 12.2185 25.1416C12.3029 25.179 12.3939 25.1991 12.4862 25.2008Z'
                                fill='#FF2626'
                              />
                              <path
                                d='M21.5162 25.2008C21.6954 25.1973 21.8664 25.1246 21.9932 24.9978C22.1199 24.871 22.1927 24.7001 22.1962 24.5208V15.4904C22.1927 15.3112 22.1199 15.1402 21.9932 15.0134C21.8664 14.8867 21.6954 14.8139 21.5162 14.8104C21.3358 14.8104 21.1629 14.8821 21.0354 15.0096C20.9078 15.1371 20.8362 15.3101 20.8362 15.4904V24.48C20.8306 24.5727 20.8441 24.6655 20.8758 24.7528C20.9074 24.8401 20.9566 24.9199 21.0203 24.9875C21.084 25.055 21.1609 25.1088 21.2462 25.1455C21.3315 25.1821 21.4233 25.201 21.5162 25.2008Z'
                                fill='#FF2626'
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className='cart-total'>
              <h5 className='title'>Cart Total</h5>
              <div className='d-flex flex-column '>
                <div className='d-flex justify-content-between align-items-center'>
                  <p>Subtotal</p>
                  <p>${subtotal}</p>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <p>Shopping Charge</p>
                  <p>${shoppingCharge}</p>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <p>Estimated Tax</p>
                  <p>${tax}</p>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <p>Discount</p>
                  <p>${discount}</p>
                </div>
              </div>
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <h6>Total</h6>
                <p>${total}</p>
              </div>
              <button className='thm-btn w-100'>
                <b>Checkout</b> <span></span>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShoppingCart;
