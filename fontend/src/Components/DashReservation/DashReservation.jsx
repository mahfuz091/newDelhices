import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useRootContext } from "../../Provider/Context";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

import toast from "react-hot-toast";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";

const DashReserVation = () => {
  const { control, setControl } = useRootContext();
  const [axiosSecure] = UseAxiosSecure();
  const [reservation, setReservation] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [maxTablesPerDay, setMaxTablesPerDay] = useState("");
  const [maxTables, setMaxTables] = useState(maxTablesPerDay);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const getReservation = async () => {
    try {
      const res = await axiosSecure.get("/api/table");
      setReservation(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaxTables = async () => {
    try {
      const res = await axiosSecure.get("/api/table/max-tables");
      setMaxTablesPerDay(res.data[0].maxTablesPerDay);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReservation();
    getMaxTables();
  }, [control]);

  useEffect(() => {
    setMaxTables(maxTablesPerDay);
  }, [maxTablesPerDay]);

  const handleDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`api/table/${id}`);
      console.log("Deleted:", response);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      setControl(!control);
    } catch (error) {
      console.error("Error deleting Item:", error);
      toast.error("Error deleting Item");
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "slNo", headerName: "Sl No.", flex: 0.5, minWidth: 100 }, // Smaller flex for index
    { field: "fname", headerName: "Name", flex: 1, minWidth: 200 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
    { field: "address", headerName: "address", flex: 1, minWidth: 200 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 150 },
    { field: "hour", headerName: "Hour", flex: 1, minWidth: 150 },
    { field: "comment", headerName: "Note", flex: 1, minWidth: 200 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      minWidth: 200,
      renderCell: (params) => (
        <>
          <IconButton
            color='error'
            aria-label='delete'
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Transform category data to match DataGrid's expected format
  const rows = reservation?.map((item, index) => {
    // Parse date in DD/MM/YYYY format
    const [day, month, year] = item.date.split("/");
    const formattedDate = new Date(
      `${year}-${month}-${day}`
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }); // Format as '15 Nov 2024'

    // Parse hour in 'HH:MM' 24-hour format and convert to '12:00 PM' format
    const formattedHour = new Date(
      `1970-01-01T${item.hour}`
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }); // Format hour as '12.00 PM'

    return {
      id: item._id,
      slNo: index + 1, // Adding serial number manually
      fname: `${item.fname} ${item.lname}`,
      email: item.email,
      phone: item.phone,
      address: item.address,
      date: formattedDate,
      hour: formattedHour,
      comment: item.comment,
    };
  });

  const paginationModel = { page: 0, pageSize: 5 };

  const handleUpdate = async () => {
    const data = { maxTablesPerDay: parseFloat(maxTables) };
    try {
      const res = await axiosSecure.put("/api/table/max-tables", data);
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

  return (
    <div>
      {/* Add Category Button */}
      <div>
        <h6 className='mb-3'>
          Total Tables for Reservation : {maxTablesPerDay}
        </h6>
        <button className='thm-btn' onClick={handleOpen}>
          Update Total Tables For Reservation
        </button>
      </div>
      <Paper sx={{ height: "100%", width: "100%", marginTop: 3 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
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
            Max Table Qty For Reservation
          </Typography>
          <TextField
            margin='dense'
            label='Max Table'
            fullWidth
            variant='outlined'
            value={maxTables} // Set the value to maxTablesPerDay
            onChange={(e) => setMaxTables(e.target.value)} // Update maxTablesPerDay on change
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleUpdate}
            sx={{ background: "var(--S1, #c86011)", marginTop: "10px" }}
          >
            Update Table Qty
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DashReserVation;
