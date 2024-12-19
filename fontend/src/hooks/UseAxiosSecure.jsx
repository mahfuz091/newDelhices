import axios from "axios";
import { useEffect } from "react";
import { useRootContext } from "../Provider/Context";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});

const UseAxiosSecure = () => {
  const { toggleSignIn } = useRootContext();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 ||
            error.response.status === 403 ||
            error.response.status === 501 ||
            error.response.status === 503)
        ) {
          // Handle unauthorized access
          console.log("Unauthorized, possibly log out or refresh token here");
          toggleSignIn();
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return [axiosSecure];
};

export default UseAxiosSecure;
