import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const apiUrl = `${process.env.API_URL}:${port}`;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
