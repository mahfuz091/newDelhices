import React from "react";
import { Container } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";

const DeliveryLocation = () => {
  return (
    <section className='delivery-location'>
      <Container>
        <h4 className='section-title'>Delivery Location</h4>
        <a href='' className='loc-btn'>
          <IoLocationSharp color='#C86011' /> Oakley, United States
        </a>
      </Container>
    </section>
  );
};

export default DeliveryLocation;
