import axios from "axios";

axios.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  return req;
});

export default axios;
