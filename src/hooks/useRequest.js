import axios from "../axios";
const { useState, useEffect } = require("react");

export const REQUEST_METHODS = {
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  GET: "GET",
  OPTIONS: "OPTIONS",
};

const fetchData = async (requestConfig) => {
  const {
    url,
    method,
    data,
    setResponse,
    setIsLoading,
    setError,
  } = requestConfig;
  try {
    const fetchedData = await axios({ url, method, data });
    setResponse(fetchedData);
    setIsLoading(false);
  } catch (error) {
    setError(error);
  }
};

const useRequest = (url, data = null, method = "get") => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestConfig = {
      url,
      method,
      data,
      setResponse,
      setIsLoading,
      setError,
    };
    fetchData(requestConfig);
  }, [data, method, url]);

  return [response, error, isLoading];
};

export default useRequest;
