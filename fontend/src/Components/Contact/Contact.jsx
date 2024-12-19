import { Col, Container, Row } from "react-bootstrap";

import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { TfiTimer } from "react-icons/tfi";

const Contact = () => {
  return (
    <section className='contact-section'>
      <Container>
        <h2 className='section-title text-center'>Contact Us</h2>
        <div className='contact-container'>
          <Row>
            <Col lg={6}>
              <div className='contact-content'>
                <form action='' className='form-one'>
                  <div className='form-one__group'>
                    <div className='form-one__control'>
                      <label htmlFor=''>Name</label>
                      <input
                        placeholder='First Name'
                        type='text'
                        name='first_name'
                      />
                    </div>

                    <div className='form-one__control'>
                      <label htmlFor=''>Email address</label>
                      <input
                        placeholder='Email address'
                        type='email'
                        name='email_id'
                      />
                    </div>
                    <div className='form-one__control'>
                      <label htmlFor=''>Phone Number</label>
                      <input
                        placeholder='Phone Number'
                        type='number'
                        name='phone'
                      />
                      <span className='commit-text'>
                        We will never share your email address or phone number
                        with anyone.
                      </span>
                    </div>
                    <div className='form-one__control form-one__control--full'>
                      <label htmlFor=''>Message</label>
                      <textarea name='message' placeholder='Message'></textarea>
                    </div>
                    <div className='form-one__control form-one__control--full'>
                      <button type='submit' className='thm-btn'>
                        <b>Submit</b>
                        <span></span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
            <Col lg={6}>
              <ul className='contact-two__info__box-wrapper list-unstyled'>
                <li className='contact-two__info__box'>
                  <h4 className='contact-two__info__box__title'>
                    Our Location
                  </h4>
                  <p className='contact-two__info__box__text'>
                    8 RUE DES PERRIERES 21000 DIJON
                  </p>
                </li>
                <li className='contact-two__info__box'>
                  <h4 className='contact-two__info__box__title'>
                    Contact Info
                  </h4>
                  <p className='contact-two__info__box__text'>
                    <div className='d-flex gap-2'>
                      <span>Phone:</span>
                      <a href='tel:025461556695 '>+025461556695</a>
                    </div>
                  </p>
                  <p className='contact-two__info__box__text'>
                    <div className='d-flex gap-2'>
                      <span>Email:</span>
                      <a href='mailto:example@gmail.com'>example@gmail.com</a>
                    </div>
                  </p>
                </li>
                <li className='contact-two__info__box'>
                  <h4 className='contact-two__info__box__title'>Feedback</h4>
                  <p className='contact-two__info__box__text'>
                    <p className='contact-two__info__box__text'>
                      How was your experience?
                    </p>
                    <a href=''>Leave us a review</a>
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
