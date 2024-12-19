import React, { useState } from "react";
import "./addSauce.css";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import Editor from "../Editor/Editor";

const AddSauce = () => {
  const [axiosSecure] = UseAxiosSecure();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    console.log(data);

    try {
      const response = await axiosSecure.post("/api/sauce", data);
      console.log("Response:", response.data);
      toast.success("Sauce posted successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error posting sauce:", error);
      toast.error("Failed to post the Sauce.");
    }
  };

  return (
    <div className='dash-add__blog'>
      <h1>Add Sauce</h1>
      <form onSubmit={handlePost}>
        <div className='form-group'>
          <label htmlFor='post-title'>Sauce Name</label>
          <input
            type='text'
            id='post-title'
            name='title'
            placeholder='Enter title'
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='post-details'>Sauce Price</label>
          {/* <Editor setFormData={setFormData} /> */}
          <input
            type='text'
            id='post-title'
            name='price'
            placeholder='Enter price'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='feature-image'>Feature Image</label>
          <input
            type='file'
            id='feature-image'
            name='image'
            onChange={handleFileChange}
          />
        </div>
        <div className='form-actions'>
          <button type='submit' className='save-btn'>
            Save and Post
          </button>
          <button type='reset' className='discard-btn'>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSauce;
