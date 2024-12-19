import { useEffect, useState } from "react";
import Context from "./Context";
import useAxiosPublic from "../hooks/UseAxiosPublic";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

const ThemeProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [axiosSecure] = UseAxiosSecure();
  const [control, setControl] = useState(false);
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showShopping, setShowShopping] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [itemName, setItemName] = useState("");
  const [guestInfo, setGuestInfo] = useState(null);
  const [clickNcollect, setClickNcollect] = useState(
    JSON.parse(localStorage.getItem("clickNcollect")) || true
  );
  const [category, setCategory] = useState([]);
  const [tabContents, setTabContents] = useState([]);
  const [active, setActive] = useState();
  const [guest, setGuest] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    email: "",

    collectionTime: "",
  });

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    document.body.classList.toggle("locked", !isExpanded);
  };

  // Toggle clickNcollect state and save to localStorage
  const handleDeliveryToggle = () => {
    const newClickNcollectState = !clickNcollect;
    setClickNcollect(newClickNcollectState);
    localStorage.setItem(
      "clickNcollect",
      JSON.stringify(newClickNcollectState)
    );
  };

  const getAllCategories = async () => {
    try {
      const res = await axiosPublic.get("/api/category");
      console.log(res);
      setCategory(res?.data);
      if (res.data?.length) {
        setActive(res.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllItems = async (query = "") => {
    try {
      const res = await axiosPublic.get(`/api/items`, {
        params: { name: query }, // Send the search query as a parameter
      });
      console.log(res, "items");
      setTabContents(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await axiosSecure.get("/api/users/profile");
      console.log(res);

      setUser(res.data);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  // const handleSignIn = async (fields) => {
  //   try {
  //     const res = await axiosPublic.post("/api/login", fields, {
  //       withCredentials: true,
  //     });

  //     setControl(!control);
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   console.log(fields);
  // };
  // const handleSignUp = async (fields) => {
  //   const currentTimestamp = new Date().toISOString();
  //   let data = JSON.stringify({
  //     demographics: {
  //       givenName: fields.firstName,
  //       familyName: fields.lastName,
  //       dateOfBirthDay: fields.day,
  //       dateOfBirthMonth: fields.month,
  //       dateOfBirthYear: fields.year,
  //       gender: "male",
  //     },
  //     acknowledgements: {
  //       privacyPolicyAcceptedAt: currentTimestamp,
  //       termsAndConditionsAcceptedAt: currentTimestamp,
  //     },
  //     email: fields.email,
  //     mobileNumber: fields.phone,
  //     password: fields.password,
  //   });

  //   console.log(data);

  //   try {
  //     const res = await axiosPublic.post("/api/v1/identity/register", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   console.log(fields);
  // };

  // Handle quantity change
  const changeQuantity = (_id, action) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = savedCart.findIndex((item) => item._id === _id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...savedCart];
      if (action === "increase") {
        updatedCart[existingItemIndex].quantity += 1; // Increment quantity
      } else if (action === "decrease") {
        updatedCart[existingItemIndex].quantity -= 1; // Decrement quantity
        if (updatedCart[existingItemIndex].quantity <= 0) {
          // Remove item if quantity reaches zero
          updatedCart.splice(existingItemIndex, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      setControl(!control);
    }
  };

  // Calculate the subtotal
  const calculateSubtotal = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    return savedCart
      .reduce((acc, item) => {
        // Start with the base price of the item
        let itemTotal = item.price * item.quantity;

        // If the item has drinks, add the drinks price
        if (item.drinks && Array.isArray(item.drinks)) {
          itemTotal += item.drinks.reduce((drinkAcc, drink) => {
            return drinkAcc + drink.price * item.quantity; // Add the price of each drink times the quantity
          }, 0);
        }

        // If the item has sauces, add the sauce price
        if (item.sauces && Array.isArray(item.sauces)) {
          itemTotal += item.sauces.reduce((sauceAcc, sauce) => {
            return sauceAcc + sauce.price * item.quantity; // Add sauce price times the item quantity
          }, 0);
        }
        // If the item has sauces, add the sauce price
        if (item.option && item.option.price) {
          itemTotal += item.option?.price;
        }
        // If the item has sauces, add the sauce price
        if (item.optionsTwo && item.optionsTwo.price) {
          itemTotal += item.optionsTwo.price;
        }

        // Accumulate the total
        return acc + itemTotal;
      }, 0)
      .toFixed(2); // Return the subtotal rounded to two decimal places
  };

  const handleDelete = (id) => {
    // Get the existing cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter out the item to be deleted based on its _id
    const updatedCart = savedCart.filter((item) => item._id !== id);

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update the cart state in the component
    setCartItems(updatedCart);
    setControl(!control); // Toggle control to trigger re-render
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };
  const toggleShopping = () => {
    setShowShopping((prev) => !prev);
  };
  const toggleSignIn = () => {
    setShowSignIn((prevSign) => !prevSign);
    setGuest(false);
  };
  const toggleSignUp = () => {
    setShowSignUp((prevSign) => !prevSign);
    setGuest(false);
  };
  const toggleGuest = () => {
    setGuest((prevSign) => !prevSign);
  };

  useEffect(() => {
    getAllCategories();
    getAllItems();
    getUser();
  }, []);

  const toggleInfo = {
    setControl,
    control,
    // handleSignIn,

    // handleSignUp,
    itemName,
    setItemName,
    showCart,
    setShowCart,
    toggleCart,
    showShopping,
    setShowShopping,
    toggleShopping,
    showSignIn,
    setShowSignIn,
    toggleSignIn,
    toggleSignUp,
    showSignUp,
    setShowSignUp,
    cartItems,
    setCartItems,
    changeQuantity,
    calculateSubtotal,
    handleDelete,
    isExpanded,
    setIsExpanded,
    handleToggle,
    clickNcollect,
    setClickNcollect,
    handleDeliveryToggle,
    category,
    setCategory,
    tabContents,
    setTabContents,
    active,
    setActive,
    user,
    setUser,
    getAllCategories,
    getAllItems,
    getUser,
    guest,
    setGuest,
    toggleGuest,
    guestInfo,
    setGuestInfo,
    orderDetails,
    setOrderDetails,
  };
  return <Context.Provider value={toggleInfo}>{children}</Context.Provider>;
};

export default ThemeProvider;
