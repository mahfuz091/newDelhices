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

const DashDrinks = () => {
  const { category, setCategory, control, setControl } = useRootContext();
  const [axiosSecure] = UseAxiosSecure();

  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false); // State for Add Category Modal
  const [drinks, setDrinks] = useState();

  const getDrinks = async () => {
    try {
      const res = await axiosSecure.get("/api/drinkNFries");
      setDrinks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDrinks();
  }, [control]);

  const handleDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`api/drinkNFries/${id}`);
      console.log("Deleted:", response.data);

      setControl(!control);
    } catch (error) {
      console.error("Error deleting Sauce", error);
    }
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
            width: "100px",
            height: "50px",
          }}
        />
      ),
    },
    { field: "name", headerName: "Drinks Name", flex: 1 },
    { field: "price", headerName: "Drinks Price", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={`/dashboard/drinks/update/${params.row.id}`}>
            <IconButton color='primary' aria-label='edit'>
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
  const rows = drinks?.map((item, index) => ({
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
      <Link to='/dashboard/drinks/add' className='thm-btn'>
        Add Drink And Fries
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
    </div>
  );
};

export default DashDrinks;
