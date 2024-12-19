import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useRootContext } from "../../Provider/Context";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UpdateCategoryModal from "../UpdateCategoryModal/UpdateCategoryModal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal"; // Import new Add Category Modal

const DashCategory = () => {
  const { category, setCategory, control, setControl, getAllCategories } =
    useRootContext();
  const [axiosSecure] = UseAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false); // State for Add Category Modal

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null); // Clear selected category after closing modal
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`api/category/${id}`);
      console.log("Deleted:", response.data);

      // Update the category list after deletion
      setCategory((prev) => prev.filter((item) => item._id !== id));
      setControl(!control);
      getAllCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle the opening of the "Add Category" modal
  const handleOpenAddCategoryModal = () => {
    setOpenAddCategoryModal(true);
  };

  // Handle the closing of the "Add Category" modal
  const handleCloseAddCategoryModal = () => {
    setOpenAddCategoryModal(false);
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "slNo", headerName: "Sl No.", flex: 0.5 }, // Smaller flex for index
    { field: "name", headerName: "Category Name", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`/src/assets/images/${params.value}`}
          alt={params.row.name}
          style={{ objectFit: "cover", borderRadius: 4, width: "50px" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
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
  const rows = category?.map((item, index) => ({
    id: item._id,
    slNo: index + 1, // Adding serial number manually
    name: item.name,
    image: item.image,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      {/* Add Category Button */}
      <button className='thm-btn' onClick={handleOpenAddCategoryModal}>
        Add Category
      </button>

      <Paper sx={{ height: "100%", width: "100%", marginTop: 3 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Update Category Modal */}
      <UpdateCategoryModal
        open={openModal}
        onClose={handleCloseModal}
        categoryToEdit={selectedCategory}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        open={openAddCategoryModal}
        onClose={handleCloseAddCategoryModal}
      />
    </div>
  );
};

export default DashCategory;
