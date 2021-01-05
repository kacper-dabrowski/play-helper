import React, { useState } from "react";
import { connect } from "react-redux";
import MainTextarea from "../../components/MainTextarea/MainTextarea";
import Navbar from "./Navbar/Navbar";
import Settings from "./Settings/Settings";
import { StyledPlayNext } from "./StyledPlayNext";
import { Container } from "./StyledPlayNext";
import identifiers from "../../shared/identifiers";
const PlayNext = ({ username }) => {
  const [language, setLanguage] = useState(identifiers.language.polish);
  const [sex, setSex] = useState(identifiers.sex.man);
  const [template, setTemplate] = useState("");
  const [activeTemplate, setActiveTemplate] = useState("");

  return (
    <StyledPlayNext>
      <Navbar username={username} />
      <Container>
        <Settings
          language={language}
          setLanguage={setLanguage}
          sex={sex}
          setSex={setSex}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />
        <MainTextarea value={template} setTemplate={setTemplate} />
      </Container>
    </StyledPlayNext>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.fullName,
});

export default connect(mapStateToProps, null)(PlayNext);
