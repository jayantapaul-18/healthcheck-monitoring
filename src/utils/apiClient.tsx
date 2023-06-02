import axios from "axios";

export default axios.create({
  baseURL: process.env.STATUS_SERVER_URL,
  headers: {
    "Content-type": "application/json",
  },
});
