const urls = {
  api: process.env.NODE_ENV === "production" ? "" : "http://localhost:3001",
  signup: "/signup",
  login: "/login",
};

export default urls;
