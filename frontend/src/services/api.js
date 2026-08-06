import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend port
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;