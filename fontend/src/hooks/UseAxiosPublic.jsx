import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API,
  // baseURL: "https://new-delhices-backend.vercel.app/",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
