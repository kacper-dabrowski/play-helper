import React, { useState } from "react";
import MainTextarea from "../../../components/MainTextarea/MainTextarea";
import SrqFinder from "./SrqFinder/SrqFinder";

const Srq = () => {
  const [template, setTemplate] = useState("");
  return (
    <>
      <SrqFinder setTemplate={setTemplate} />
      <MainTextarea value={template} setTemplate={setTemplate} />
    </>
  );
};

export default Srq;
