import axios from "axios";

axios.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers,
    Authorization: localStorage.getItem("token"),
    "Content-Type": "application/json",
  };
  console.log(req);
  return req;
});

export default axios;
