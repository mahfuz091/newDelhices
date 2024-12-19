import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useRootContext } from "../../Provider/Context";
import { Col, Container, Row } from "react-bootstrap";
import time from "../../assets/images/time.svg";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import deleteIcon from "../../assets/images/delete.png";
import sans from "./sans";
import DeliveryCart from "../DeliveryCart/DeliveryCart";
const sanSauce = {
  id: "sans",
  title: "San Sauce",
};
const OptionsMenu = () => {
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
    toggleShopping,
    itemName,
    setItemName,
  } = useRootContext();
  const [item, setItem] = useState(null);
  const [sauce, setSauce] = useState([]);
  const [nanSauce, setNanSauce] = useState([]);
  const [drinkNFries, setDeinkNFries] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]); // Track selected sauces
  const [selectedNanSauces, setSelectedNanSauces] = useState([]); // Track selected naan sauces
  const [selectedDrinksNFries, setSelectedDrinksNFries] = useState([]); // Track selected drinks/fries
  const [selectedSan, setSelectedSan] = useState([]); // Track selected drinks/fries

  const axiosPublic = useAxiosPublic();
  const params = useParams();
  const id = params.id;
  const activeTabTitle = params.cat;
  console.log(params, "ac");

  const getItem = async () => {
    try {
      const res = await axiosPublic.get(`/api/items/${id}`);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSauce = async () => {
    try {
      const res = await axiosPublic.get(`/api/sauce/`);
      setSauce(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getNanSauce = async () => {
    try {
      const res = await axiosPublic.get(`/api/nansauce/`);
      setNanSauce(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDrinksNFries = async () => {
    try {
      const res = await axiosPublic.get(`/api/drinkNFries/`);
      setDeinkNFries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const masonryOptions = {
    transitionDuration: 500,
  };

  console.log("active", activeTabTitle, active);

  const [isDelivery, setIsDelivery] = useState(true);

  const handleToggle = () => {
    setIsDelivery(!isDelivery);
  };

  const subtotal = calculateSubtotal();

  const handleCart = () => {
    if (item?.availability === false) {
      toast.error(`${item?.name} is unavailable`);
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = savedCart.findIndex((it) => it._id === item._id);

    if (existingItemIndex !== -1) {
      // If the item exists, increase the quantity
      const updatedCart = [...savedCart];
      updatedCart[existingItemIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setControl(!control);
    } else {
      // Add a new item with selected sauces
      let newCartItem = {
        _id: item._id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: 1,
      };

      if (activeTabTitle === "Entree") {
        // If active tab is "Entree", add sauces to the cart item
        newCartItem = {
          ...newCartItem,
          sauces: selectedSauces.map((sauce) => ({
            ...sauce, // Spread the properties of the sauce object
            price: parseFloat(sauce.price), // Parse the price field as a float
          })), // Assuming `selectedSauces` state exists for "Entree" sauces
        };
      } else if (activeTabTitle === "Naan Role") {
        // If active tab is "Nan Role", add naan sauces and drinks/fries
        newCartItem = {
          ...newCartItem,
          naanSauces: selectedNanSauces, // Add selected naan sauces

          drinks: selectedDrinksNFries.map((drink) => ({
            ...drink, // Spread the properties of the sauce object
            price: parseFloat(drink.price), // Parse the price field as a float
          })), // Add selected drinks/fries
          sans: selectedSan,
        };
      }
      const updatedCart = [...savedCart, newCartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setControl(!control);
    }
    toggleShopping();
    setItemName(item.name);
    navigate("/menu");
  };

  const handleSauceChange = (event, sauceItem) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the sauce to the selected list
      setSelectedSauces((prevSauces) => [...prevSauces, sauceItem]);
    } else {
      // Remove the sauce from the selected list
      setSelectedSauces((prevSauces) =>
        prevSauces.filter((s) => s._id !== sauceItem._id)
      );
    }
  };
  const handleNanSauceChange = (event, sauceItem) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (selectedNanSauces.length >= 2) {
        toast.error("You can only select up to 2 naan sauces.");
        return;
      }
      setSelectedNanSauces((prevSauces) => [...prevSauces, sauceItem]);
    } else {
      setSelectedNanSauces((prevSauces) =>
        prevSauces.filter((s) => s._id !== sauceItem._id)
      );
    }
  };
  const handleDrinkNFriesChange = (event, drinkItem) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (selectedDrinksNFries.length >= 1) {
        toast.error("You can only select 1 drink or fries.");
        return;
      }
      setSelectedDrinksNFries([drinkItem]); // Replace with the new selection
    } else {
      setSelectedDrinksNFries([]);
    }
  };
  const handleSanChange = (event, sanItem) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedSan((prev) => [...prev, sanItem]);
    } else {
      setSelectedSan((prev) => prev.filter((s) => s.id !== sanItem.id));
    }
  };

  const handleNext = (event, sauceItem) => {
    navigate(`/menu/menuoptions/${item._id}/sauce`, { state: sauceItem });
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    getItem();
    getSauce();
    getDrinksNFries();
    getNanSauce();
  }, [control]);

  return (
    <Layout>
      <Helmet>
        <meta charSet='utf-8' />
        <title>The Map - New Delhices</title>
      </Helmet>
      <section className='category'>
        <Container>
          <h2 className='section-title'>{item?.name}</h2>

          <Row className='gy-20'>
            <Col xl={8}>
              <div className='tabs-content '>
                <div>
                  <h1 className='tabs-title'>ETAPE 1 : </h1>
                </div>
                <Row options={masonryOptions} className='gy-20'>
                  {item?.step1Options?.map((sauceItem) => (
                    <Col key={sauceItem._id} lg={4}>
                      <div className='h-100'>
                        <div className='tab-card flex-column align-items-center justify-content-center    '>
                          <div className='tab-card__img'>
                            {sauceItem.image !== "" && (
                              <img
                                className='img-fluid'
                                src={
                                  new URL(
                                    `../../assets/images/${sauceItem.image}`,
                                    import.meta.url
                                  ).href
                                }
                                alt=''
                              />
                            )}
                          </div>

                          <div className='text-center'>
                            <p className='price'>
                              {" "}
                              {`${sauceItem.title} ${
                                sauceItem.price ? `(+${sauceItem.price}€)` : ""
                              }`}
                            </p>

                            <button
                              onClick={(e) => handleNext(e, sauceItem)}
                              className='thm-btn px-3 py-1 mt-3'
                            >
                              Ajouter au panier
                            </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col xl={4}>
              <DeliveryCart />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default OptionsMenu;
