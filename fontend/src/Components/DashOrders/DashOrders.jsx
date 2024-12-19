import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useRootContext } from "../../Provider/Context";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const DashOrders = () => {
  const { tabContents, setTabContents, control, setControl } = useRootContext();
  const [axiosSecure] = UseAxiosSecure();
  const [orders, setOrders] = useState(null);
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [openItemsModal, setOpenItemsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getAllOrders = async () => {
    try {
      const res = await axiosSecure.get("/api/orders");
      setOrders(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [control]);

  const handleDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`/api/orders/${id}`);
      console.log("Deleted:", response.data);
      if (response.status === 200) {
        setTabContents((prev) => prev.filter((item) => item._id !== id));
        setControl(!control);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting Item:", error);
      toast.error("Error deleting Item");
    }
  };

  const handleOpenAddItemModal = () => {
    setOpenAddItemModal(true);
  };

  const handleCloseAddItemModal = () => {
    setOpenAddItemModal(false);
  };

  const handleOpenItemsModal = (order) => {
    setSelectedOrder(order);
    setOpenItemsModal(true);
  };

  const handleCloseItemsModal = () => {
    setOpenItemsModal(false);
    setSelectedOrder(null);
  };

  const columns = [
    { field: "slNo", headerName: "Sl No.", flex: 0.5, minWidth: 100 },
    { field: "customer", headerName: "Customer Name", flex: 1, minWidth: 200 },
    {
      field: "customerEmail",
      headerName: "Customer Email",
      flex: 1,
      minWidth: 200,
    },
    { field: "totalAmount", headerName: "Total Price", flex: 1, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 150 },
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
          <Link to={`/dashboard/orders/${params.row.id}`}>
            <IconButton
              color='info'
              aria-label='see-items'
              // onClick={() => handleOpenItemsModal(params.row)}
            >
              <Typography variant='body2' color='primary'>
                See Details
              </Typography>
            </IconButton>
          </Link>
        </>
      ),
    },
  ];

  // const rows = orders?.map((order, index) => ({
  //   id: order._id,
  //   slNo: index + 1,
  //   customer: order?.customer?.firstName,
  //   customerEmail: order?.customer?.email,
  //   totalAmount: order.totalAmount.toFixed(2),
  //   status: order.status,
  //   items: order.items || [],
  //   deliveryInfo: order?.deliveryInfo || null,
  // }));
  const rows = orders?.map((order, index) => ({
    id: order._id,
    slNo: index + 1,
    customer: order?.customer
      ? order.customer.firstName
      : order?.guestInfo?.name || "Unknown", // Fallback to guestInfo name or "Unknown"
    customerEmail: order?.customer
      ? order.customer.email
      : order?.guestInfo?.email || "No Email", // Fallback to guestInfo email or "No Email"
    totalAmount: order.totalAmount.toFixed(2),
    status: order.status,
    items: order.items || [],
    deliveryInfo: order?.deliveryInfo || null,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <Paper sx={{ height: "auto", width: "100%", marginTop: 3 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            height: "auto !important",
            maxHeight: "none !important ",
            ".MuiDataGrid-row": {
              height: "auto !important",
              maxHeight: "none !important",
            },
          }}
        />
      </Paper>

      {/* Modal for viewing items and delivery info */}
      <Modal
        open={openItemsModal}
        onClose={handleCloseItemsModal}
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
          <Typography id='modal-items-title' variant='h6' component='h2'>
            Order Details
          </Typography>

          {/* Display Delivery Info */}
          {selectedOrder?.deliveryInfo ? (
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant='subtitle1'>Delivery Information</Typography>
              <Typography variant='body2'>
                Name: {selectedOrder.deliveryInfo.name}
              </Typography>
              <Typography variant='body2'>
                Phone: {selectedOrder.deliveryInfo.phone}
              </Typography>
              <Typography variant='body2'>
                Email: {selectedOrder.deliveryInfo.email}
              </Typography>
              <Typography variant='body2'>
                Address: {selectedOrder.deliveryInfo.street},{" "}
                {selectedOrder.deliveryInfo.apartment}
              </Typography>
              <Typography variant='body2'>
                Note: {selectedOrder.deliveryInfo.note}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ margin: "15px 0" }}
            >
              Click And Collect Order
            </Typography>
          )}

          {/* Display Items as Cards */}
          <Grid container spacing={1}>
            {selectedOrder?.items?.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card variant='outlined' sx={{ minWidth: 120, padding: 1 }}>
                  <CardContent>
                    <Typography variant='subtitle1' component='div'>
                      {item.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Quantity: {item.quantity}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default DashOrders;
