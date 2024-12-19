import React, { useState, useEffect } from "react";
import { TextField, Button, Modal, Box } from "@mui/material";
import { useRootContext } from "../../Provider/Context";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const UpdateCategoryModal = ({ open, onClose, categoryToEdit }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
  });

  console.log(categoryToEdit, "categoryToEdit");

  // Assuming setCategory updates the context
  const { setCategory, setControl, control, getAllCategories } =
    useRootContext();
  const [axiosSecure] = UseAxiosSecure();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [imgSrc, setImgSrc] = useState("/1.png");
  console.log(imgSrc);
  // Handle file change (image upload)
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    const reader = new FileReader();

    const { files } = event.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  // Load category data into the form when the modal opens
  useEffect(() => {
    if (categoryToEdit) {
      setCategoryData({
        name: categoryToEdit.name,
        image: categoryToEdit.image,
      });
    }
  }, [categoryToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // function onChange(event) {
  //   setImgSrc(event.target.files[0]);
  // }

  // const handleUpdate = async () => {
  //   try {
  //     // Create a FormData object to send data as 'multipart/form-data'
  //     const formData = new FormData();
  //     formData.append("name", categoryData.name); // Append category name
  //     if (image) {
  //       formData.append("image", image); // Append the image file (if exists)
  //     }

  //     // Send the request to update the category
  //     const response = await axiosSecure.put(
  //       `/api/category/${categoryToEdit._id}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // Ensure correct Content-Type for file upload
  //         },
  //       }
  //     );

  //     // Update the category in the context state
  //     setCategory((prevCategories) =>
  //       prevCategories.map((category) =>
  //         category._id === categoryToEdit._id ? response.data : category
  //       )
  //     );

  //     // Close the modal after successful update
  //     onClose();
  //   } catch (error) {
  //     console.error("Error updating category:", error);
  //   }
  // };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", categoryData.name); // Add name to FormData
    if (image) {
      formData.append("image", image); // Add image if selected
    }

    try {
      const response = await axiosSecure.put(
        `/api/category/${categoryToEdit.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response (e.g., update the context or state)
      console.log(response.data);
      toast.success(" Category Updated Successfully");
      onClose(); // Close the modal after the update
      setControl(!control);
      setImgSrc("/1.png");
      getAllCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(error?.response?.message || "Something Wrong");
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          padding: 3,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <h2>Edit Category</h2>

        {/* Category Name Input */}
        <TextField
          label='Category Name'
          variant='outlined'
          fullWidth
          margin='normal'
          name='name'
          value={categoryData.name}
          onChange={handleInputChange}
        />

        {/* Category Image Upload Input */}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            margin: "10px 0",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "60px",
              maxHeight: "60px",
              borderRadius: "5px",
            }}
            src={imgSrc}
            alt=''
          />
          <Button
            component='label'
            variant='contained'
            htmlFor='account-settings-upload-image'
            sx={{ margin: "10px 0" }}
          >
            Upload Photo
            <input
              hidden
              type='file'
              onChange={handleImageChange}
              accept='image/*'
              id='account-settings-upload-image'
              name='img'
            />
          </Button>
        </Box>

        {/* <Button variant='contained' color='primary' fullWidth>
          Update Category
          <TextField
            hidden
            label='Category Image'
            type='file'
            variant='outlined'
            fullWidth
            margin='normal'
            onChange={handleImageChange} // Image change handler
          />
        </Button> */}

        {/* Update Button */}
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleUpdate}
        >
          Update Category
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateCategoryModal;
