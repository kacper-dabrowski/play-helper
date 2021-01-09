import React, { useEffect, useState } from "react";
import { StyledSrqResults } from "./StyledSrqResults";
import axios from "../../../../../axios";
import urls from "../../../../../shared/urls";
import SrqResult from "./SrqResult/SrqResult";
import { ClipLoader } from "react-spinners";

const SrqResults = () => {
  const [results, setResults] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSrq = async () => {
      try {
        const response = await axios.get(urls.api + urls.srq);
        const srqArray = response?.data?.supportRequests;
        console.log(srqArray);
        if (!srqArray || !Array.isArray(srqArray)) {
          throw new Error("Nie znaleziono zapisanych Support Request");
        }
        setIsLoading(false);
        setResults(srqArray);
      } catch (error) {
        setHasError(error.message);
      }
    };

    fetchSrq();
  }, []);

  if (hasError) {
    return (
      <StyledSrqResults>
        <p>{hasError}</p>
      </StyledSrqResults>
    );
  }

  if (loading) {
    return (
      <StyledSrqResults>
        <ClipLoader color={"white"} />
      </StyledSrqResults>
    );
  }
  const supportRequests = results.map(({ title, description, department }) => (
    <SrqResult
      title={title}
      description={description}
      department={department}
    />
  ));
  console.log(results);

  return <StyledSrqResults>{supportRequests}</StyledSrqResults>;
};

export default SrqResults;
