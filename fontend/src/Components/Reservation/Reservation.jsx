import React, { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import toast from "react-hot-toast";
import success from "../../assets/images/success.gif";

const Reservation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to generate times in 15-minute increments
  const generateTimes = (startTime, endTime) => {
    const times = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      const hours = Math.floor(currentTime / 60); // Convert total minutes to hours
      const minutes = currentTime % 60; // Remaining minutes
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      times.push(formattedTime);
      currentTime += 15; // Increment by 15 minutes
    }

    return times;
  };

  // Generate morning and evening times
  const getValidTimes = (date) => {
    const currentDate = new Date(); // Current date and time
    const isToday = date.toDateString() === currentDate.toDateString(); // Check if selected date is today

    // Define morning and evening time ranges (in minutes from midnight)
    const morningTimes = generateTimes(690, 825); // 11:30 AM (690 min) to 13:45 PM (825 min)
    const eveningTimes = generateTimes(1110, 1380); // 18:30 PM (1110 min) to 23:00 PM (1380 min)

    let allTimes =
      date.getDay() === 5 ? eveningTimes : [...morningTimes, ...eveningTimes];

    if (isToday) {
      // Filter out past times for today's date
      const currentMinutes =
        currentDate.getHours() * 60 + currentDate.getMinutes(); // Current time in minutes
      allTimes = allTimes.filter((time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const timeInMinutes = hours * 60 + minutes;
        return timeInMinutes >= currentMinutes;
      });
    }

    return allTimes;
  };

  const handleReservation = async (e) => {
    e.preventDefault();

    const time = e.target.hour.value;

    // Format the data similar to the Postman example
    const data = {
      date: startDate.toLocaleDateString("en-GB"),
      hour: time,
      peopleCount: e.target.peopleCount.value,
      email: e.target.email.value,
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      comment: e.target.comment.value,
    };

    try {
      const response = await axiosPublic.post("/api/table", data);
      console.log(response);
      e.target.reset();
      if (response.status === 403) {
        toast.error(response.message);
      } else {
        setStartDate(new Date());
        handleShow();
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 403) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Failed to make a reservation.");
      }
    }
  };
  // Helper function to format time in AM/PM
  const formatTimeToAmPm = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  // Inside your component
  const validTimes = getValidTimes(startDate);

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
                <select name='hour' className='w-100'>
                  {validTimes.map((time) => (
                    <option key={time} value={time}>
                      {formatTimeToAmPm(time)}
                    </option>
                  ))}
                </select>
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
                <input type='text' name='lname' id='' placeholder='Last Name' />
              </Col>
              <Col lg={6}>
                <input
                  type='tel'
                  name='phone'
                  id=''
                  placeholder='Phone Number'
                />
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
            receive a confirmation shortly with the details of your booking.
          </p>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Reservation;
