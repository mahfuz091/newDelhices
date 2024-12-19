import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    "Content-type": "application/json",
  },
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
