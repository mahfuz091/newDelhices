import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRootContext } from "../../Provider/Context";

import useAxiosPublic from "../../hooks/UseAxiosPublic";

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
  } = useRootContext();

  const axiosPublic = useAxiosPublic();

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
      console.log(res);
      if (res?.status === 200) {
        toggleSignIn();
        setControl(!control);
      }
    } catch (error) {
      console.log(error);
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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
        {showSignUp ? (
          <div className='sign-in'>
            <div className='sign-in__container sign-up'>
              <h5>I Am Not Yet Registered</h5>
              <form action='' onSubmit={handleSignUp}>
                <Row className='gy-20'>
                  <Col md={6}>
                    <input
                      type='text'
                      placeholder='First Name'
                      name='firstName'
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type='text'
                      placeholder='Last Name'
                      name='lastName'
                    />
                  </Col>
                  <Col md={6}>
                    <input type='number' placeholder='Number' name='number' />
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
                        type={isPassVisible ? "password" : "text"}
                        placeholder='password'
                        name='password'
                        onChange={handlePasswordChange}
                      />
                      <span onClick={() => setIsPassVisible(!isPassVisible)}>
                        {isPassVisible ? (
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
                        type={isConfirmPassVisible ? "password" : "text"}
                        placeholder='confirm password'
                        onChange={handleConfirmPasswordChange}
                      />
                      <span
                        onClick={() =>
                          setIsConfirmPassVisible(!isConfirmPassVisible)
                        }
                      >
                        {isConfirmPassVisible ? (
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
                  <b>Sign Up</b>
                  <span></span>
                </button>
              </form>
              <p className='text-center'>
                You already have an account?{" "}
                <Link to='#' onClick={toggleSignUp}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className='sign-in'>
            <div className='sign-in__container'>
              <h5>I Am Already A Customer</h5>
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
                        type={isPassVisible ? "password" : "text"}
                        placeholder='password'
                        name='password'
                      />
                      <span onClick={() => setIsPassVisible(!isPassVisible)}>
                        {isPassVisible ? (
                          <IoIosEye size={25} />
                        ) : (
                          <IoIosEyeOff size={25} />
                        )}
                      </span>
                    </div>
                  </Col>
                </Row>

                <div className='d-flex justify-content-between mt-2'>
                  <div>
                    <input type='checkbox' name='' id='remember' />

                    <label htmlFor='remember'>Remember me</label>
                  </div>
                  <Link to='#'>forgot password</Link>
                </div>
                <button className='thm-btn w-100' type='submit'>
                  <b>Login</b>
                  <span></span>
                </button>
              </form>
              <p className='text-center'>
                You have no account?{" "}
                <Link to='#' onClick={toggleSignUp}>
                  Sign Up
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
