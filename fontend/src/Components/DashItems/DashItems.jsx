import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useRootContext } from "../../Provider/Context";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import AddItemModal from "../AddItemModal/AddItemModal";
import toast from "react-hot-toast";
import UpdateItemModal from "../UpdateItemModal/UpdateItemModal";

const DashItems = () => {
  const { tabContents, setTabContents, control, setControl, getAllItems } =
    useRootContext();
  const [axiosSecure] = UseAxiosSecure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddItemModal, setOpenAddItemModal] = useState(false); // State for Add Category Modal
  console.log(tabContents, "seleItem");

  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    getAllItems(e.target.value); // Fetch items based on search input
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`/api/items/${id}`);
      console.log("Deleted:", response.data);

      setTabContents((prev) => prev.filter((item) => item._id !== id));
      setControl(!control);
    } catch (error) {
      console.error("Error deleting Item:", error);
      toast.error("Error deleting Item");
    }
  };

  // Handle the opening of the "Add Category" modal
  const handleOpenAddItemModal = () => {
    setOpenAddItemModal(true);
  };

  // Handle the closing of the "Add Category" modal
  const handleCloseAddItemModal = () => {
    setOpenAddItemModal(false);
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "slNo", headerName: "Sl No.", flex: 0.5, minWidth: 100 }, // Smaller flex for index
    { field: "name", headerName: "Item Name", flex: 1, minWidth: 200 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      minWidth: 200,

      renderCell: (params) => (
        <img
          src={`/src/assets/images/${params.value}`}
          alt={params.row.name}
          style={{ objectFit: "cover", borderRadius: 4, width: "50px" }}
        />
      ),
    },
    { field: "price", headerName: "Item Price", flex: 1, minWidth: 200 },
    { field: "details", headerName: "Item Details", flex: 1, minWidth: 200 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      minWidth: 200,
      renderCell: (params) => (
        <>
          <IconButton
            color='primary'
            aria-label='edit'
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
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
  const rows = tabContents?.map((item, index) => ({
    id: item._id,
    slNo: index + 1, // Adding serial number manually
    name: item.name,
    price: parseFloat(item.price).toFixed(2),
    details: item.details,
    image: item.image,
    availability: item.availability,
    totalAvailableQtyPerDay: item.totalAvailableQtyPerDay,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className=''>
      <div className='d-flex justify-content-between'>
        {/* Add Category Button */}
        <button className='thm-btn' onClick={handleOpenAddItemModal}>
          Add Item
        </button>
        <div style={{ marginBottom: 16 }}>
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Search items...'
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
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

      {/* Update Item Modal */}
      <UpdateItemModal
        open={openModal}
        onClose={handleCloseModal}
        itemToEdit={selectedItem}
      />

      {/* Add Item Modal */}
      <AddItemModal open={openAddItemModal} onClose={handleCloseAddItemModal} />
    </div>
  );
};

export default DashItems;
