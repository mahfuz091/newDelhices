import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Col, Container, Row } from "react-bootstrap";
import { useRootContext } from "../../Provider/Context";

const SignUp = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const { toggleSignUp, showSignUp } = useRootContext();
  return (
    <>
      <div className={`cart-popup ${showSignUp ? "active" : ""}`}>
        <div
          onClick={toggleSignUp}
          className='cart-popup__overlay cart-toggler'
        ></div>

        <div className='cart-popup__content'>
          <div className='sign-in'>
            <Container>
              <div className='sign-in__container sign-up'>
                <h5>I Am Not Yet Registered</h5>
                <form action=''>
                  <Row className='gy-20'>
                    <Col md={6}>
                      <input type='text' placeholder='First Name' />
                    </Col>
                    <Col md={6}>
                      <input type='text' placeholder='Last Name' />
                    </Col>
                    <Col md={6}>
                      <input type='number' placeholder='Number' />
                    </Col>
                    <Col md={6}>
                      <input type='email' placeholder='Email Address' />
                    </Col>
                    <Col sm={12}>
                      <div className='password'>
                        <input
                          type={isPassVisible ? "password" : "text"}
                          placeholder='password'
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
                          type={isPassVisible ? "password" : "text"}
                          placeholder='confirm password'
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
                    </Col>
                  </Row>

                  <button className='thm-btn w-100' type='submit'>
                    <b>Sign Up</b>
                    <span></span>
                  </button>
                </form>
                <p className='text-center'>
                  You already have an account? <Link to='/login'>Sign In</Link>
                </p>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
