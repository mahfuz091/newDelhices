import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useRootContext } from "../../Provider/Context";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UpdateCategoryModal from "../UpdateCategoryModal/UpdateCategoryModal";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal"; // Import new Add Category Modal
import { Link } from "react-router-dom";

const DashNanSauce = () => {
  const { category, setCategory, control, setControl } = useRootContext();
  const [axiosSecure] = UseAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false); // State for Add Category Modal
  const [sauces, setSauces] = useState();

  const getSauce = async () => {
    try {
      const res = await axiosSecure.get("/api/nansauce");
      setSauces(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSauce();
  }, [control]);

  const handleEdit = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null); // Clear selected category after closing modal
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`api/nansauce/${id}`);
      console.log("Deleted:", response.data);

      setControl(!control);
    } catch (error) {
      console.error("Error deleting Sauce", error);
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

    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`/src/assets/images/${params.value}`}
          alt={params.row.name}
          style={{
            objectFit: "cover",
            borderRadius: 4,
            width: "80px",
            height: "40px",
          }}
        />
      ),
    },
    { field: "name", headerName: "Sauce Name", flex: 1 },
    { field: "price", headerName: "Sauce Price", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={`/dashboard/nan-sauce/update/${params.row.id}`}>
            <IconButton
              color='primary'
              aria-label='edit'
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Link>

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
  const rows = sauces?.map((item, index) => ({
    id: item._id,
    slNo: index + 1, // Adding serial number manually
    image: item.image,
    name: item.title,
    price: item.price,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  // Calculate row height dynamically based on content
  const getRowHeight = (params) => {
    // Adjust height depending on the description length
    if (params?.row?.image) {
      return 200; // Larger height for rows with longer descriptions
    }
    return 60; // Default height for other rows
  };

  return (
    <div>
      {/* Add Category Button */}
      <Link to='/dashboard/sauce/add-sauce' className='thm-btn'>
        Add Sauce
      </Link>

      <Paper sx={{ height: "100%", width: "100%", marginTop: 3 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          getRowHeight={getRowHeight}
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

export default DashNanSauce;
