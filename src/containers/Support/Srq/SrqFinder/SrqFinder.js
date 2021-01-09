import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import urls from "../../../../shared/urls";
import SrqResults from "./SrqResults/SrqResults";
import SrqSearchbar from "./SrqSearchbar/SrqSearchbar";
import { StyledSrqFinder } from "./StyledSrqFinder";

const SrqFinder = () => {
  const [results, setResults] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = (searchPhrase) => {
    const search = results.filter((result) => {
      return (
        result.title.toLowerCase().includes(searchPhrase) ||
        result.description.toLowerCase().includes(searchPhrase) ||
        result.department.toLowerCase().includes(searchPhrase)
      );
    });
    setSearchResults(search);
    return;
  };

  const searchSrqHandler = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

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

  return (
    <StyledSrqFinder>
      <SrqResults
        supportRequests={searchQuery ? searchResults : results}
        hasError={hasError}
        isLoading={loading}
      />
      <SrqSearchbar onType={searchSrqHandler} value={searchQuery} />
    </StyledSrqFinder>
  );
};

export default SrqFinder;
