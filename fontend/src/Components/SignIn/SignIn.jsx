import React, { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useRootContext } from "../../Provider/Context";

import useAxiosPublic from "../../hooks/UseAxiosPublic";
import toast from "react-hot-toast";

const SignIn = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassError, setConfirmPassError] = useState(""); // Error message state

  const {
    toggleSignIn,
    showSignIn,
    toggleSignUp,
    showSignUp,
    setShowSignUp,
    control,
    setControl,
    toggleGuest,
    guest,
    guestInfo,
    setGuestInfo,
    orderDetails,
    setOrderDetails,
    setGuest,
  } = useRootContext();
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    let data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const res = await axiosPublic.post("/api/users/login", data, {
        withCredentials: true,
      });

      if (res?.status === 200) {
        toggleSignIn();
        setControl(!control);
        const user = res?.data;
        localStorage.setItem("user", JSON.stringify(user));
        e.target.reset();
      }
      e.target.reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Prevent form submission if passwords do not match
    if (password !== confirmPassword) {
      setConfirmPassError("Passwords do not match.");
      return;
    }

    // Clear the error message if passwords match
    setConfirmPassError("");
    let data = {
      email: e.target.email.value,
      password,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      number: e.target.number.value,
    };

    try {
      const res = await axiosPublic.post("/api/users", data, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toggleSignIn();
        setControl(!control);
        toast.success("SuccessFully SignUp");
        const user = res?.data;
        localStorage.setItem("user", JSON.stringify(user));
        e.target.reset();
      }
      e.target.reset();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
  const handleGuest = async (e) => {
    e.preventDefault();
    // Prevent form submission if passwords do not match

    toggleSignIn();
  };

  // Handler for password fields to update state and validate match
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setConfirmPassError("Passwords do not match.");
    } else {
      setConfirmPassError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setConfirmPassError("Passwords do not match.");
    } else {
      setConfirmPassError("");
    }
  };

  return (
    <div className={`cart-popup ${showSignIn ? "active" : ""}`}>
      <div
        onClick={() => {
          toggleSignIn();
          // setShowSignUp(true);
        }}
        className='cart-popup__overlay cart-toggler'
      ></div>

      <div className='cart-popup__content'>
        {guest ? (
          <div className='sign-in'>
            <div className='sign-in__container sign-up'>
              <h5>guest</h5>

              <form action='' onSubmit={handleGuest}>
                <Row className='gy-20'>
                  <Col md={12}>
                    <input
                      type='text'
                      placeholder='Nom'
                      name='name'
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={12}>
                    <input
                      type='number'
                      placeholder='Téléphone'
                      name='phone'
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={12}>
                    <input
                      type='email'
                      placeholder='Adresse e-mail'
                      name='email'
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <button
                  className='thm-btn w-100'
                  type='submit'
                  disabled={confirmPassError}
                >
                  <b>Créer mon compte</b>
                  <span></span>
                </button>
              </form>

              <p className='text-center'>
                Vous avez déjà un compte ?{" "}
                <Link to='#' onClick={toggleSignUp}>
                  {showSignUp ? "Se connecter" : "Inscrivez-vous"}
                </Link>
              </p>
            </div>
          </div>
        ) : showSignUp ? (
          <div className='sign-in'>
            <div className='sign-in__container sign-up'>
              <h5>Je ne suis pas encore inscrit</h5>
              <form action='' onSubmit={handleSignUp}>
                <Row className='gy-20'>
                  <Col md={6}>
                    <input type='text' placeholder='Prénom' name='firstName' />
                  </Col>
                  <Col md={6}>
                    <input
                      type='text'
                      placeholder='Nom de famille'
                      name='lastName'
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type='number'
                      placeholder='Téléphone'
                      name='number'
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type='email'
                      placeholder='Email Address'
                      name='email'
                    />
                  </Col>
                  <Col sm={12}>
                    <div className='password'>
                      <input
                        type={!isPassVisible ? "password" : "text"}
                        placeholder='Mot de passe'
                        name='password'
                        onChange={handlePasswordChange}
                      />
                      <span onClick={() => setIsPassVisible(!isPassVisible)}>
                        {!isPassVisible ? (
                          <IoIosEye size={25} />
                        ) : (
                          <IoIosEyeOff size={25} />
                        )}
                      </span>
                    </div>
                  </Col>
                  <Col sm={12}>
                    <div className='password'>
                      <input
                        type={!isConfirmPassVisible ? "password" : "text"}
                        placeholder='Confirmer mot de passe'
                        onChange={handleConfirmPasswordChange}
                      />
                      <span
                        onClick={() =>
                          setIsConfirmPassVisible(!isConfirmPassVisible)
                        }
                      >
                        {!isConfirmPassVisible ? (
                          <IoIosEye size={25} />
                        ) : (
                          <IoIosEyeOff size={25} />
                        )}
                      </span>
                    </div>
                    {/* Display error message if passwords don't match */}
                    {confirmPassError && (
                      <p style={{ color: "red", fontSize: "14px" }}>
                        {confirmPassError}
                      </p>
                    )}
                  </Col>
                </Row>

                <button
                  className='thm-btn w-100'
                  type='submit'
                  disabled={confirmPassError}
                >
                  <b>Créer mon compte</b>
                  <span></span>
                </button>
              </form>
              <p className='text-center'>
                Vous avez déjà un compte ?{" "}
                <Link to='#' onClick={toggleSignUp}>
                  Se connecter
                </Link>
              </p>
              <p className='text-center m-0 ou'>ou</p>
              <p className='text-center m-0'>
                Sans connexion{" "}
                <Link to='#' onClick={toggleGuest}>
                  Utilisateur invité
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className='sign-in'>
            <div className='sign-in__container'>
              <h5>Je Suis Deja Client</h5>
              <form action='' onSubmit={handleLogin}>
                <Row className='gy-20'>
                  <Col sm={12}>
                    <input
                      type='email'
                      placeholder='Email Address'
                      name='email'
                    />
                  </Col>
                  <Col sm={12}>
                    <div className='password'>
                      <input
                        type={!isPassVisible ? "password" : "text"}
                        placeholder='Mot de passe'
                        name='password'
                      />
                      <span onClick={() => setIsPassVisible(!isPassVisible)}>
                        {!isPassVisible ? (
                          <IoIosEye size={25} />
                        ) : (
                          <IoIosEyeOff size={25} />
                        )}
                      </span>
                    </div>
                  </Col>
                </Row>

                <button className='thm-btn w-100' type='submit'>
                  <b>Se connecter</b>
                  <span></span>
                </button>
              </form>
              <p className='text-center'>
                Vous n&apos;avez pas de compte ?{" "}
                <Link to='#' onClick={toggleSignUp}>
                  Inscrivez-vous
                </Link>
              </p>
              <p className='text-center m-0 ou'>ou</p>
              <p className='text-center m-0'>
                Sans connexion{" "}
                <Link to='#' onClick={toggleGuest}>
                  Utilisateur invité
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
