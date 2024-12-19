import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useRootContext } from "../../Provider/Context";
import toast from "react-hot-toast";

const AddItemModal = ({ open, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [options, setOptions] = useState([{}]); // Step 1 options
  const [step2Options, setStep2Options] = useState([{}]); // Step 2 options
  const [showOptions, setShowOptions] = useState(false); // Checkbox to show/hide options
  const [axiosSecure] = UseAxiosSecure();
  const { setControl, control, category } = useRootContext();
  console.log(options);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    setCategoryImage(event.target.files[0]);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];

    if (event.target.name === "image") {
      // If the field being changed is the image (file input)
      newOptions[index][event.target.name] = event.target.files[0]; // Save the file itself
    } else {
      // For all other fields (like text inputs)
      newOptions[index][event.target.name] = event.target.value;
    }

    setOptions(newOptions);
  };

  const handleStep2OptionChange = (index, event) => {
    const newStep2Options = [...step2Options];

    if (event.target.name === "image") {
      // If the field being changed is the image (file input)
      newStep2Options[index][event.target.name] = event.target.files[0]; // Save the file itself
    } else {
      // For all other fields (like text inputs)
      newStep2Options[index][event.target.name] = event.target.value;
    }

    setStep2Options(newStep2Options);
  };

  const handleAddOption = () => {
    setOptions([...options, {}]);
  };

  const handleAddStep2Option = () => {
    setStep2Options([...step2Options, {}]);
  };

  const handleCheckboxChange = (event) => {
    setShowOptions(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);
    formData.append("details", details);
    formData.append("price", price);
    formData.append("catId", selectedCategory._id);

    console.log(categoryImage);

    // Step 1 options (serialize the object as a JSON string)
    formData.append("step1Options", JSON.stringify(options)); // Make sure options are serialized

    // Step 2 options (serialize the object as a JSON string)
    formData.append("step2Options", JSON.stringify(step2Options)); // Same for step 2 options

    // Append Step 1 options and their images (if any)
    options.forEach((option, index) => {
      if (option.image) {
        formData.append(`step1OptionsImages[]`, option.image); // Use a consistent name for the images array
      }
      formData.append(`step1Options[${index}].title`, option.title || "");
      formData.append(`step1Options[${index}].price`, option.price || "");
    });

    // Append Step 2 options and their images (if any)
    step2Options.forEach((option, index) => {
      if (option.image) {
        formData.append(`step2OptionsImages[]`, option.image); // Same for step 2 options
      }
      formData.append(`step2Options[${index}].title`, option.title || "");
      formData.append(`step2Options[${index}].price`, option.price || "");
    });

    try {
      const response = await axiosSecure.post("/api/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Item Added:", response.data);
      setControl(!control);
      toast.success("Item added successfully");

      // Reset form fields
      setCategoryName("");
      setCategoryImage(null);
      setDetails("");
      setPrice("");
      setSelectedCategory([]);
      setOptions([{}]);
      setStep2Options([{}]);
      setShowOptions(false);

      onClose();
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error(error?.response?.message || "Something went wrong");
    }
  };

  console.log(selectedCategory.name);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Item Name'
          fullWidth
          variant='outlined'
          value={categoryName}
          onChange={handleCategoryNameChange}
        />
        <input type='file' onChange={handleImageChange} accept='image/*' />

        <TextField
          margin='dense'
          label='Details'
          fullWidth
          variant='outlined'
          value={details}
          onChange={handleDetailsChange}
        />

        <TextField
          margin='dense'
          label='Price'
          fullWidth
          variant='outlined'
          value={price}
          onChange={handlePriceChange}
        />

        <FormControl fullWidth margin='dense'>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label='Category'
          >
            {category.map((cat) => (
              <MenuItem key={cat._id} value={cat}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Checkbox to show/hide Step 1 and Step 2 options */}
        {selectedCategory.name === "Menus" && (
          <FormControlLabel
            control={
              <Checkbox
                checked={showOptions}
                onChange={handleCheckboxChange}
                name='showOptions'
                color='primary'
              />
            }
            label='Options'
          />
        )}

        {/* Conditionally render Step 1 and Step 2 options if checkbox is checked */}
        {showOptions && (
          <>
            {/* Step 1 Options */}
            <div>
              <h3>Step 1 Options</h3>
              {options.map((option, index) => (
                <div key={index}>
                  <TextField
                    margin='dense'
                    label='Title'
                    name='title'
                    fullWidth
                    variant='outlined'
                    value={option.title || ""}
                    onChange={(event) => handleOptionChange(index, event)}
                  />
                  <input
                    type='file'
                    name='image'
                    onChange={(event) => handleOptionChange(index, event)}
                    accept='image/*'
                  />
                  <TextField
                    margin='dense'
                    label='Price'
                    name='price'
                    fullWidth
                    variant='outlined'
                    value={option.price || ""}
                    onChange={(event) => handleOptionChange(index, event)}
                  />
                </div>
              ))}
              <Button
                onClick={handleAddOption}
                sx={{ background: "#c86011", color: "#fff" }}
              >
                + Add Step 1 Option
              </Button>
            </div>

            {/* Step 2 Options */}
            <div>
              <h3>Step 2 Options</h3>
              {step2Options.map((option, index) => (
                <div key={index}>
                  <TextField
                    margin='dense'
                    label='Title'
                    name='title'
                    fullWidth
                    variant='outlined'
                    value={option.title || ""}
                    onChange={(event) => handleStep2OptionChange(index, event)}
                  />
                  <input
                    type='file'
                    name='image'
                    onChange={(event) => handleStep2OptionChange(index, event)}
                    accept='image/*'
                  />
                  <TextField
                    margin='dense'
                    label='Price'
                    name='price'
                    fullWidth
                    variant='outlined'
                    value={option.price || ""}
                    onChange={(event) => handleStep2OptionChange(index, event)}
                  />
                </div>
              ))}
              <Button
                onClick={handleAddStep2Option}
                sx={{ background: "#c86011", color: "#fff" }}
              >
                + Add Step 2 Option
              </Button>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ background: "#c86011", color: "#fff" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ background: "#c86011", color: "#fff" }}
        >
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal;
