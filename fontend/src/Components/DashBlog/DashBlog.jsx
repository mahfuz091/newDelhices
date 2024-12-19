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

const DashBlog = () => {
  const { category, setCategory, control, setControl } = useRootContext();
  const [axiosSecure] = UseAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false); // State for Add Category Modal
  const [blogs, setBlogs] = useState();

  const getBlog = async () => {
    try {
      const res = await axiosSecure.get("/api/blog");
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlog();
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
      const response = await axiosSecure.delete(`api/blog/${id}`);
      console.log("Deleted:", response.data);

      // Update the category list after deletion
      setCategory((prev) => prev.filter((item) => item._id !== id));
      setControl(!control);
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
    { field: "name", headerName: "Blog Title", flex: 1 },
    { field: "description", headerName: "Blog Description", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={`/dashboard/blog/update/${params.row.id}`}>
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
  const rows = blogs?.map((item, index) => ({
    id: item._id,
    slNo: index + 1, // Adding serial number manually
    image: item.image,
    name: item.title,
    description: item.description,
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
      <Link to='/dashboard/blog/add-blog' className='thm-btn'>
        Add Blog
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

export default DashBlog;
