import { useEffect, useState } from "react";
import Context from "./Context";
import useAxiosPublic from "../hooks/UseAxiosPublic";

const ThemeProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [control, setControl] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [clickNcollect, setClickNcollect] = useState(
    JSON.parse(localStorage.getItem("clickNcollect")) || false
  );
  const [category, setCategory] = useState([]);
  const [tabContents, setTabContents] = useState([]);
  const [active, setActive] = useState();

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

  const getAllItems = async () => {
    try {
      const res = await axiosPublic.get("/api/items");
      console.log(res);
      setTabContents(res?.data);
    } catch (error) {
      console.log(error);
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
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
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
  const toggleSignIn = () => {
    setShowSignIn((prevSign) => !prevSign);
  };
  const toggleSignUp = () => {
    setShowSignUp((prevSign) => !prevSign);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    const role = localStorage.getItem("role");
    getAllCategories();
    getAllItems();
  }, [control]);
  const toggleInfo = {
    setControl,
    control,
    // handleSignIn,

    // handleSignUp,

    showCart,
    setShowCart,
    toggleCart,
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
  };
  return <Context.Provider value={toggleInfo}>{children}</Context.Provider>;
};

export default ThemeProvider;
