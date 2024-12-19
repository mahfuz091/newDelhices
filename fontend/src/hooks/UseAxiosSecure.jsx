import axios from "axios";
import { useEffect } from "react";
import { useRootContext } from "../Provider/Context";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API,
  // baseURL: "https://new-delhices-backend.vercel.app/",
  withCredentials: true,
});

const UseAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error.response.status);

        if (
          error.response &&
          (error.response.status === 401 ||
            error.response.status === 403 ||
            error.response.status === 501 ||
            error.response.status === 503)
        ) {
          // Handle unauthorized access
          console.log("Unauthorized, possibly log out or refresh token here");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return [axiosSecure];
};

export default UseAxiosSecure;
