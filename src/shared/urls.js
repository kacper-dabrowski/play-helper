const urls = {
  api:
    process.env.NODE_ENV === "production"
      ? "http://play-helper-api.herokuapp.com/"
      : "http://localhost:3001",
  signup: "/signup",
  login: "/login",
};

export default urls;
