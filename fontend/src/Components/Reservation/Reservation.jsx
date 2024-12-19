import React, { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import success from "../../assets/images/success.gif";

const Reservation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [axiosSecure] = UseAxiosSecure();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReservation = async (e) => {
    e.preventDefault();

    // Format the data similar to the Postman example
    const data = {
      date: startDate.toLocaleDateString("en-GB"),
      hour: e.target.hour.value,
      peopleCount: e.target.peopleCount.value,
      email: e.target.email.value,
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      Comment: e.target.comment.value,
    };
    console.log(data);

    try {
      const response = await axiosSecure.post("/api/table", data);
      console.log(response.data);
      e.target.reset();
      setStartDate(new Date());
      handleShow();
    } catch (error) {
      console.error(error);
      toast.error("Failed to make a reservation.");
    }
  };

  return (
    <section className='reservation'>
      <Container>
        <h5 onClick={handleShow} className='section-title text-center'>
          Reserve a table
        </h5>

        <div className='reserve-container'>
          <form action='' onSubmit={handleReservation}>
            <Row className='gy-20'>
              <Col lg={6}>
                <div className='date-picker-container'>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className='w-100'
                    dateFormat='MMMM d, yyyy'
                  />
                  <span className='calendar-icon'>
                    <FaCalendarAlt className='calendar-icon' />
                  </span>
                </div>
              </Col>
              <Col lg={6}>
                <input type='time' name='hour' id='' />
              </Col>
              <Col lg={6}>
                <input
                  type='number'
                  name='peopleCount'
                  id=''
                  placeholder='Number Of People'
                />
              </Col>
              <Col lg={6}>
                <input
                  type='email'
                  name='email'
                  id=''
                  placeholder='Email Address'
                />
              </Col>
              <Col lg={6}>
                <input
                  type='text'
                  name='fname'
                  id=''
                  placeholder='First Name'
                />
              </Col>
              <Col lg={6}>
                <input type='text' name='' id='lname' placeholder='Last Name' />
              </Col>
              <Col lg={6}>
                <input type='tel' name='phone' id='' placeholder='Number' />
              </Col>
              <Col lg={6}>
                <input type='text' name='address' placeholder='Address' />
              </Col>
              <Col lg={12}>
                <textarea
                  name='comment'
                  id=''
                  rows={5}
                  placeholder='Comments'
                ></textarea>
              </Col>
              <Col lg={12}>
                <button type='submit' className='thm-btn w-100'>
                  <b>Validate The Reservation</b> <span></span>
                </button>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
      <Modal
        show={show}
        size='lg'
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        className='reserve-modal'
      >
        <Modal.Body>
          <img src={success} alt='' width={314} height={314} />
          <h3>Reservation Successful</h3>
          <p>
            Your reservation request has been successfully submitted. You will
            receive a confirmation shortly with the details of your booking
          </p>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Reservation;
