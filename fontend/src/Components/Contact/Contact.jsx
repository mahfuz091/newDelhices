import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { TfiTimer } from "react-icons/tfi";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import toast from "react-hot-toast";

const Contact = () => {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axiosPublic.post(
        "/api/contact",
        JSON.stringify(formData)
      );
      console.log(response);

      setStatus("Message sent successfully!");
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message.");
      toast.error(error?.response?.data);
    }
  };
  return (
    <section className='contact-section'>
      <Container>
        <h2 className='section-title text-center'>Contactez-nous</h2>
        <div className='contact-container'>
          <Row>
            <Col lg={6}>
              <div className='contact-content'>
                <form action='' className='form-one' onSubmit={handleSubmit}>
                  <div className='form-one__group'>
                    <div className='form-one__control'>
                      <label htmlFor=''>Nom</label>
                      <input
                        placeholder='Nom'
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className='form-one__control'>
                      <label htmlFor=''>Adresse e-mail</label>
                      <input
                        placeholder='Adresse e-mail'
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='form-one__control'>
                      <label htmlFor=''>Numéro de téléphone</label>
                      <input
                        placeholder='Numéro de téléphone'
                        type='number'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <span className='commit-text'>
                        Nous ne partagerons jamais votre adresse e-mail ou votre
                        numéro de téléphone avec qui que ce soi
                      </span>
                    </div>
                    <div className='form-one__control form-one__control--full'>
                      <label htmlFor=''>Message</label>
                      <textarea
                        name='message'
                        placeholder='Message'
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className='form-one__control form-one__control--full'>
                      <button type='submit' className='thm-btn'>
                        <b>Soumettre</b>
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
                    Notre emplacement
                  </h4>
                  <p className='contact-two__info__box__text'>
                    8 RUE DES PERRIERES 21000 DIJON
                  </p>
                </li>
                <li className='contact-two__info__box'>
                  <h4 className='contact-two__info__box__title'>Coordonnées</h4>
                  <p className='contact-two__info__box__text'>
                    <div className='d-flex gap-2'>
                      <span>Téléphone:</span>
                      <a href='tel:025461556695 '>+025461556695</a>
                    </div>
                  </p>
                  <p className='contact-two__info__box__text'>
                    <div className='d-flex gap-2'>
                      <span>E-mail:</span>
                      <a href='mailto:example@gmail.com'>example@gmail.com</a>
                    </div>
                  </p>
                </li>
                <li className='contact-two__info__box'>
                  <h4 className='contact-two__info__box__title'>Retour</h4>
                  <p className='contact-two__info__box__text'>
                    <p className='contact-two__info__box__text'>
                      Comment s&apos;est déroulée votre expérience ?
                    </p>
                    <a href=''>Laissez nous un avis</a>
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
