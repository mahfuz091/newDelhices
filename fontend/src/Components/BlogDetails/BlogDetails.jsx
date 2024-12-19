import React, { useEffect, useState } from "react";
import "./BlogDetails.css";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/UseAxiosPublic";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [blog, setBlog] = useState({});

  const getBlog = async () => {
    try {
      const res = await axiosPublic.get(`/api/blog/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className='blog-details'>
      {/* <img src={blog.image} alt={blog.title} className='blog-image' /> */}
      <img
        className='blog-image'
        src={new URL(`../../assets/images/${blog.image}`, import.meta.url).href}
        alt=''
      />
      <h1 className='blog-title'>{blog.title}</h1>
      <p className='blog-description'>{blog.description}</p>
    </div>
  );
};

export default BlogDetails;
