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
const OptionsEntree = () => {
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
          <ul className='category-tabs list-unstyled d-none'>
            {category?.map(({ _id, name, image }, index) => (
              <li
                key={_id}
                onClick={() => setActive(_id)}
                className={`tab-btn ${active === _id ? "active-btn" : ""}`}
              >
                {name}

                <img
                  // src={require(`../../assets/images/${image}`).default}
                  src={
                    new URL(`../../assets/images/${image}`, import.meta.url)
                      .href
                  }
                  alt=''
                />
              </li>
            ))}
          </ul>
          <Row className='gy-20'>
            <Col xl={8}>
              {activeTabTitle === "Entree" ? (
                <div className='tabs-content '>
                  <div>
                    <h1 className='tabs-title'>
                      VOULEZ-VOUS UN ACHARI SAUCE ?
                    </h1>
                  </div>
                  <Row options={masonryOptions} className='gy-20'>
                    {sauce.map((sauceItem) => (
                      <Col key={sauceItem._id} lg={4}>
                        <div className=''>
                          <input
                            id={sauceItem._id}
                            name={sauceItem._id}
                            type='checkbox'
                            value='51408,LIME MIXED PICKLES,0.50'
                            className='champ-produit-input hide-radio999'
                            style={{ visibility: "hidden", display: "none" }}
                            onChange={(e) => handleSauceChange(e, sauceItem)}
                          />
                          <label
                            htmlFor={sauceItem._id}
                            style={{ width: "120px" }}
                          >
                            {sauceItem.image !== "" && (
                              <img
                                className=''
                                src={
                                  new URL(
                                    `../../assets/images/${sauceItem.image}`,
                                    import.meta.url
                                  ).href
                                }
                                alt=''
                                width='120'
                                height='120'
                              />
                            )}
                            <br />
                            {sauceItem.title} (+{sauceItem.price}€)
                          </label>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <div className='text-end mt-3'>
                    <button
                      className='thm-btn px-3 py-1 mt-3 me-3'
                      onClick={() => handleCart()}
                    >
                      <b>Valider</b> <span></span>
                    </button>
                    <Link
                      to='/menu'
                      className='thm-btn bg-danger px-3 py-1 mt-3'
                    >
                      <b>Annuler cet article</b> <span></span>
                    </Link>
                  </div>
                </div>
              ) : activeTabTitle === "Naan Role" ? (
                <div className='tabs-content '>
                  <div>
                    <h1 className='tabs-title'>
                      CHOISISSEZ VOTRE SAUCE (2 choix maximum)
                    </h1>
                  </div>
                  <Row options={masonryOptions} className='gy-20'>
                    {nanSauce.map((sauceItem) => (
                      <Col key={sauceItem._id} lg={3}>
                        <div className='h-100'>
                          <input
                            id={sauceItem._id}
                            name={sauceItem._id}
                            type='checkbox'
                            value='51408,LIME MIXED PICKLES,0.50'
                            className='champ-produit-input hide-radio999'
                            style={{ visibility: "hidden", display: "none" }}
                            onChange={(e) => handleNanSauceChange(e, sauceItem)}
                            checked={selectedNanSauces.some(
                              (s) => s._id === sauceItem._id
                            )}
                          />
                          <label
                            htmlFor={sauceItem._id}
                            style={{ width: "120px" }}
                          >
                            {sauceItem.image !== "" && (
                              <img
                                className=''
                                src={
                                  new URL(
                                    `../../assets/images/${sauceItem.image}`,
                                    import.meta.url
                                  ).href
                                }
                                alt=''
                                width='120'
                                height='120'
                              />
                            )}
                            <br />
                            {sauceItem.title}
                          </label>
                        </div>
                      </Col>
                    ))}
                    <Col lg={3}>
                      <div className='h-100'>
                        <input
                          id={sanSauce.id}
                          name={sanSauce.id}
                          type='checkbox'
                          value='51408,LIME MIXED PICKLES,0.50'
                          className='champ-produit-input hide-radio999'
                          style={{ visibility: "hidden", display: "none" }}
                          onChange={(e) => handleNanSauceChange(e, sanSauce)}
                          checked={selectedNanSauces.some(
                            (s) => s._id === sanSauce._id
                          )}
                        />
                        <label htmlFor={sanSauce.id} style={{ width: "120px" }}>
                          {sanSauce.title}
                        </label>
                      </div>
                    </Col>
                  </Row>

                  <div className='mt-5'>
                    <h1 className='tabs-title'>
                      VOULEZ-VOUS UNE BOISSON OU UNE PORTION DE FRITES ? (1
                      choix maximum)
                    </h1>
                  </div>
                  <Row options={masonryOptions} className='gy-20'>
                    {drinkNFries.map((drinkItem) => (
                      <Col key={drinkItem._id} lg={3}>
                        <div className='h-100'>
                          <input
                            id={drinkItem._id}
                            name={drinkItem._id}
                            type='checkbox'
                            value='51408,LIME MIXED PICKLES,0.50'
                            className='champ-produit-input hide-radio999'
                            style={{ visibility: "hidden", display: "none" }}
                            onChange={(e) =>
                              handleDrinkNFriesChange(e, drinkItem)
                            }
                            checked={selectedDrinksNFries.some(
                              (s) => s._id === drinkItem._id
                            )}
                          />
                          <label
                            htmlFor={drinkItem._id}
                            style={{ width: "120px" }}
                          >
                            {drinkItem.image !== "" && (
                              <img
                                className=''
                                src={
                                  new URL(
                                    `../../assets/images/${drinkItem.image}`,
                                    import.meta.url
                                  ).href
                                }
                                alt=''
                                width='120'
                                height='120'
                              />
                            )}
                            <br />
                            {drinkItem.title} (+{drinkItem.price}€)
                          </label>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <div className='mt-5'>
                    <h1 className='tabs-title'>SANS</h1>
                  </div>
                  <Row options={masonryOptions} className='gy-20'>
                    {sans.map((san) => (
                      <Col key={san.id} lg={2}>
                        <div className=''>
                          <input
                            id={san.id}
                            name={san.id}
                            type='checkbox'
                            value={san.name}
                            className='champ-produit-input hide-radiocomp99'
                            style={{ visibility: "hidden", display: "none" }}
                            onChange={(e) => handleSanChange(e, san)}
                            checked={selectedSan.some((s) => s.id === san.id)}
                          />
                          <label htmlFor={san.id} style={{ width: "120px" }}>
                            {san.name}
                          </label>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <div className='text-end mt-3'>
                    <button
                      className='thm-btn px-3 py-1 mt-3 me-3'
                      onClick={() => handleCart()}
                    >
                      <b>Valider</b> <span></span>
                    </button>
                    <Link
                      to='/menu'
                      className='thm-btn bg-danger px-3 py-1 mt-3'
                    >
                      <b>Annuler cet article</b> <span></span>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
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

export default OptionsEntree;
