import React, { useState } from "react";
import useRequest from "../../../../hooks/useRequest";
import urls from "../../../../shared/urls";
import SrqResults from "./SrqResults/SrqResults";
import SrqSearchbar from "./SrqSearchbar/SrqSearchbar";
import { StyledSrqFinder } from "./StyledSrqFinder";

const SrqFinder = (props) => {
  const [response, error, loading] = useRequest(urls.srq, "GET", null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const srqResults = response?.data?.supportRequests;

  const onSearch = (searchPhrase) => {
    const search = srqResults.filter((result) => {
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
  console.log(srqResults);
  return (
    <StyledSrqFinder>
      <SrqSearchbar onType={searchSrqHandler} value={searchQuery} />
      <SrqResults
        setTemplate={props.setTemplate}
        supportRequests={searchQuery ? searchResults : srqResults}
        hasError={error}
        isLoading={loading}
      />
    </StyledSrqFinder>
  );
};

export default SrqFinder;
