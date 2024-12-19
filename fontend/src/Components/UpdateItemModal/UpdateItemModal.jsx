import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useRootContext } from "../../Provider/Context";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const UpdateItemModal = ({ open, onClose, itemToEdit }) => {
  const [itemData, setItemData] = useState({
    name: "",
    image: "",
    price: "",
    details: "",
    availability: "",
    totalAvailableQtyPerDay: "",
  });

  // Assuming setCategory updates the context
  const { setCategory, setControl, control } = useRootContext();
  const [axiosSecure] = UseAxiosSecure();
  const [image, setImage] = useState(null);

  const [imgSrc, setImgSrc] = useState("/1.png");

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
    if (itemToEdit) {
      setItemData({
        name: itemToEdit.name,
        image: itemToEdit.image,
        details: itemToEdit.details,
        price: itemToEdit.price,
        availability: itemToEdit.availability,
        totalAvailableQtyPerDay: itemToEdit.totalAvailableQtyPerDay,
      });
    }
  }, [itemToEdit]);

  console.log(itemData, itemToEdit, "itemData");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("price", itemData.price);
    formData.append("details", itemData.details);
    formData.append("availability", itemData.availability);
    formData.append(
      "totalAvailableQtyPerDay",
      itemData.totalAvailableQtyPerDay
    );
    if (image) {
      formData.append("image", image); // Add image if selected
    }

    try {
      const response = await axiosSecure.put(
        `/api/items/${itemToEdit.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response (e.g., update the context or state)
      console.log(response.data);
      toast.success("Item Updated Successfully");
      onClose(); // Close the modal after the update
      setControl(!control);
      setImgSrc("/1.png");
    } catch (error) {
      console.error("Error updating Item:", error);
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
        <h2>Edit Item</h2>

        {/* Item Name Input */}
        <TextField
          label='Item Name'
          variant='outlined'
          fullWidth
          margin='normal'
          name='name'
          value={itemData.name}
          onChange={handleInputChange}
        />

        {/* item Image Upload Input */}
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
            sx={{ margin: "10px 0", background: "var(--S1, #c86011)" }}
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
        <TextField
          margin='dense'
          label='Details'
          fullWidth
          variant='outlined'
          name='details'
          value={itemData.details}
          onChange={handleInputChange}
          multiline
          rows={3}
          maxRows={5}
        />

        <TextField
          margin='dense'
          label='Price'
          name='price'
          fullWidth
          variant='outlined'
          value={itemData.price}
          onChange={handleInputChange}
        />
        {/* Availability Radio Button Group */}
        <FormControl component='fieldset' sx={{ margin: "10px 0" }}>
          <FormLabel component='legend'>Availability</FormLabel>
          <RadioGroup
            row
            name='availability'
            value={itemData.availability}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value='true'
              control={<Radio />}
              label='Available'
            />
            <FormControlLabel
              value='false'
              control={<Radio />}
              label='Unavailable'
            />
          </RadioGroup>
        </FormControl>
        <TextField
          margin='dense'
          label='Available Qty Per Day'
          name='totalAvailableQtyPerDay'
          fullWidth
          variant='outlined'
          value={itemData.totalAvailableQtyPerDay}
          onChange={handleInputChange}
        />

        {/* Update Button */}
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleUpdate}
          sx={{ background: "var(--S1, #c86011)" }}
        >
          Update Item
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateItemModal;
