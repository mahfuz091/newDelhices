import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRootContext } from "../../Provider/Context";
import {
  TextField,
  Button,
  Modal,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";

const DashOrderDetails = () => {
  const params = useParams();
  const [axiosSecure] = UseAxiosSecure();
  const [orderData, setOrderData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const { setControl, control } = useRootContext();

  const getOrders = async () => {
    try {
      const res = await axiosSecure(`/api/orders/${params.id}`);

      setOrderData(res.data);
      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleUpdate = async () => {
    const data = { status: status };
    try {
      const res = await axiosSecure.put(`/api/orders/${params.id}`, data);
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        handleClose();
        setControl(!control);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStatus(value);
  };
  console.log(orderData);

  return (
    <div className='memo-container'>
      <div className='memo-header'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>Order Details</h1>
          <button className='thm-btn' onClick={handleOpen}>
            Update Order Status
          </button>
        </div>
        <p className='mt-3'>
          <strong>Order Date:</strong>{" "}
          {new Date(orderData.createdAt).toLocaleString()}
        </p>
        <p className='mt-1'>
          <strong>Order ID:</strong> {orderData._id}
        </p>
      </div>
      <div className='memo-body mt-1'>
        <p>
          <strong>Customer Name:</strong>
          {orderData?.customer
            ? `${orderData.customer.firstName || "Unknown"} ${
                orderData.customer.lastName || ""
              }`
            : orderData?.guestInfo?.name || "Unknown"}
        </p>
        <p className='mt-1'>
          <strong>Email:</strong>
          {orderData?.customer
            ? orderData.customer.email
            : orderData?.guestInfo?.email || "No Email"}
        </p>
      </div>

      <hr />

      <div className='memo-items'>
        <h2 className='mb-3'>Item Details</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.items?.map((item) => (
              <React.Fragment key={item._id}>
                <tr>
                  <td>{item.name}</td>
                  <td>€{item?.price?.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {/* Dynamically display sauces */}
                    {item.sauce && item.sauce.length > 0 && (
                      <div>
                        <strong>SAUCES:</strong>
                        {item.sauce.map((s) => (
                          <span key={s._id}>{s.title}</span>
                        ))}
                      </div>
                    )}
                    {item.naanSauce && item.naanSauce.length > 0 && (
                      <div className='d-flex gap-2'>
                        <strong>SAUCES:</strong>
                        {item.naanSauce.map((s) => (
                          <span key={s._id}>{s.title},</span>
                        ))}
                      </div>
                    )}

                    {/* Dynamically display naan roll (drinks) */}
                    {item.drinks && item.drinks.length > 0 && (
                      <div className='d-flex gap-2'>
                        <strong>OPTION NAAN ROLL:</strong>
                        {item.drinks.map((d) => (
                          <span key={d._id}>{d.title},</span>
                        ))}
                      </div>
                    )}

                    {/* Dynamically display sans options */}
                    {item.sans && item.sans.length > 0 && (
                      <div className='d-flex gap-2'>
                        <strong>SANS:</strong>
                        {item.sans.map((s, index) => (
                          <span key={index}>{s.name},</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td>€{orderData?.totalAmount?.toFixed(2)}</td>
                </tr>

                {/* Additional row for step1Options (option) if exists */}
                {item.option && (
                  <tr>
                    <td colSpan='5'>
                      <div className='d-flex gap-2'>
                        <span>{item.option.title}</span>
                        <span>
                          +
                          {item.sauce
                            .reduce(
                              (total, sauce) => total + parseFloat(sauce.price),
                              0
                            )
                            .toFixed(2)}{" "}
                          €
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Additional row for step2Options (optionTwo) if exists */}
                {item.optionTwo && (
                  <tr>
                    <td colSpan='5'>
                      <div className='d-flex gap-2'>
                        <span>{item.optionTwo.title}</span>
                        <span>
                          {item?.optionTwo?.price
                            ? `${parseFloat(item.optionTwo.price).toFixed(2)} €`
                            : ""}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className='memo-total mt-3 text-end'>
        <p>
          <strong>Total Amount:</strong> €{orderData?.totalAmount?.toFixed(2)}
        </p>
      </div>
      <div className='text-end mt-2'>
        <button onClick={handlePrint} className='print-button thm-btn'>
          Print Order
        </button>
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='modal-items-title'
        aria-describedby='modal-items-description'
      >
        <Box
          sx={{
            width: 400,
            margin: "auto",
            marginTop: 10,
            padding: 2,
            backgroundColor: "white",
          }}
        >
          <Typography
            id='modal-items-title'
            variant='h6'
            component='h2'
            sx={{ marginBottom: "10px" }}
          >
            Update Order Status
          </Typography>

          <FormControl component='fieldset' sx={{ margin: "10px 0" }}>
            <FormLabel component='legend'>Status</FormLabel>
            <RadioGroup
              row
              name='availability'
              value={status}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value='Completed'
                control={<Radio />}
                label='Completed'
              />
              <FormControlLabel
                value='Pending'
                control={<Radio />}
                label='Pending'
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleUpdate}
            sx={{ background: "var(--S1, #c86011)", marginTop: "10px" }}
          >
            Update Order Status
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DashOrderDetails;
