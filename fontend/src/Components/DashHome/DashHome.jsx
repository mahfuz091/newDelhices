import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useRootContext } from "../../Provider/Context";

const DashHome = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { tabContents, setTabContents, control, setControl } = useRootContext();
  const [reservation, setReservation] = useState(null);
  const [orders, setOrders] = useState(null);

  const getAllOrders = async () => {
    try {
      const res = await axiosSecure.get("/api/orders");
      setOrders(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getReservation = async () => {
    try {
      const res = await axiosSecure.get("/api/table");
      setReservation(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOrders();
    getReservation();
  }, []);

  return (
    <div>
      <div className='dash-faq__cards'>
        <Row className='gy-20'>
          <Col md={4}>
            <div className='faq-card'>
              <div>
                <h6>{tabContents?.length}</h6>
                <p>Total Items</p>
              </div>
              <div></div>
            </div>
          </Col>
          <Col md={4}>
            <div className='faq-card'>
              <div>
                <h6>{reservation?.length}</h6>
                <p>Total Reservations</p>
              </div>
              <div></div>
            </div>
          </Col>
          <Col md={4}>
            <div className='faq-card'>
              <div>
                <h6>{orders?.length}</h6>
                <p>Total Orders</p>
              </div>
              <div></div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashHome;
