import React from "react";
import { StyledSrqResults } from "./StyledSrqResults";
import SrqResult from "./SrqResult/SrqResult";
import { ClipLoader } from "react-spinners";

const SrqResults = ({ supportRequests, error, isLoading, setTemplate }) => {
  console.log(supportRequests);
  if (error) {
    return (
      <StyledSrqResults>
        <p>{error.message}</p>
      </StyledSrqResults>
    );
  }

  if (isLoading) {
    return (
      <StyledSrqResults>
        <ClipLoader color={"white"} />
      </StyledSrqResults>
    );
  }

  return (
    <StyledSrqResults>
      {supportRequests.map(
        ({ title, description, department, content, _id }) => (
          <SrqResult
            onClick={() => setTemplate(content)}
            key={_id}
            content={content}
            title={title}
            description={description}
            department={department}
          />
        )
      )}
    </StyledSrqResults>
  );
};

export default SrqResults;
