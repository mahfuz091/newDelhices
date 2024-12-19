import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useRootContext } from "../../Provider/Context";
import toast from "react-hot-toast";

const AddCategoryModal = ({ open, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [axiosSecure] = UseAxiosSecure();
  const { setControl, control } = useRootContext();

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    setCategoryImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);

    try {
      const response = await axiosSecure.post("/api/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Category Added:", response.data);
      setControl(!control);
      toast.success(" Category added Successfully");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error?.response?.message || "Something Wrong");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Category Name'
          fullWidth
          variant='outlined'
          value={categoryName}
          onChange={handleCategoryNameChange}
        />
        <input type='file' onChange={handleImageChange} accept='image/*' />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='primary'>
          Add Category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
