import React, { useState } from "react";
import { connect } from "react-redux";
import MainTextarea from "../../components/MainTextarea/MainTextarea";
import Navbar from "./Navbar/Navbar";
import Settings from "./Settings/Settings";
import { PlayNextTextArea, StyledPlayNext } from "./StyledPlayNext";
import { Container } from "./StyledPlayNext";
import identifiers from "../../shared/identifiers";
import { generateNextTemplate } from "../../modules/next/next";
const PlayNext = ({ username }) => {
  const [language, setLanguage] = useState(identifiers.language.polish);
  const [sex, setSex] = useState(identifiers.sex.man);
  const [template, setTemplate] = useState("");
  const [activeTemplate, setActiveTemplate] = useState("");

  const onGenerateTemplate = (type, sex, language, username) => {
    const templateToSet = generateNextTemplate(type, sex, language, username);
    setTemplate(templateToSet);
  };
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
          onGenerateTemplate={() =>
            onGenerateTemplate(activeTemplate, sex, language, username)
          }
        />
        <PlayNextTextArea value={template} setTemplate={setTemplate} />
      </Container>
    </StyledPlayNext>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.fullName,
});

export default connect(mapStateToProps, null)(PlayNext);
