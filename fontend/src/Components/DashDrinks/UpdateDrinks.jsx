import React, { useEffect, useState } from "react";
import "./addsauce.css";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Editor from "../Editor/Editor";

const UpdateDrinks = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState();
  const [control, setControl] = useState(false);
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

  const getDrink = async () => {
    try {
      const res = await axiosSecure.get(`/api/drinkNFries/${id}`);
      setDrink(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = new FormData();

    data.append("title", formData.title);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axiosSecure.put(`/api/drinkNFries/${id}`, data);
      console.log("Response:", response.data);
      toast.success("Drink posted successfully!");
      setControl(!control);
      e.target.reset();
    } catch (error) {
      console.error("Error posting blog:", error);
      toast.error("Failed to post the Drink.");
    }
  };

  useEffect(() => {
    getDrink();
  }, [control]);

  return (
    <div className='dash-add__blog'>
      <h1>Update Drink And Fries</h1>
      <form onSubmit={handlePost}>
        <div className='form-group'>
          <label htmlFor='post-title'>Drink Title</label>
          <input
            type='text'
            id='post-title'
            name='title'
            placeholder='Enter title'
            defaultValue={drink?.title}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='post-price'>Drink Price</label>
          <input
            type='text'
            id='post-price'
            name='price'
            placeholder='Enter Price'
            defaultValue={drink?.price}
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

export default UpdateDrinks;
