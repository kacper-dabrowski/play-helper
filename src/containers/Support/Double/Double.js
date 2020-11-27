import React, { useCallback, useState } from "react";
import ClearButton from "../../../components/ClearButton/ClearButton";
import ConfirmButton from "../../../components/ConfirmButton/ConfirmButton";
import MainTextarea from "../../../components/MainTextarea/MainTextarea";
import SexSection from "../../../components/SexSection/SexSection";
<<<<<<< HEAD
import generateClosedDoubleTemplate from "../../../controllers/closedDoubleController";
import generateOpenedDoubleTemplate from "../../../controllers/openedDoubleController";
import config from "../../../shared/identifiers";
=======
import generateClosedDoubleTemplate from "../../../controllers/closedDoubleController/closedDoubleController";
import generateOpenedDoubleTemplate from "../../../controllers/openedDoubleController/openedDoubleController";
import config from "../../../shared/settings";
>>>>>>> Add tests for template controllers
import InputSection from "./Sections/InputSection";
import { ConfirmButtonsWrapper, StyledSexSection } from "./StyledDouble";

const Double = ({ type }) => {
  const [sex, setSex] = useState("");
  const [current, setCurrent] = useState("");
  const [doubled, setDoubled] = useState("");
  const [template, setTemplate] = useState("");

  const generateTemplateHandler = useCallback(() => {
    let template;
    switch (type) {
      case config.double.closed:
        template = generateClosedDoubleTemplate(current, doubled);
        break;
      case config.double.opened:
        template = generateOpenedDoubleTemplate(sex, current, doubled);
        break;
      default:
        throw new Error("Invalid double type");
    }

    setTemplate(template);
  }, [type, doubled, current, sex]);

  const clearFields = useCallback(() => {
    setSex(null);
    setTemplate("");
    setDoubled("");
    setCurrent("");
  }, []);
  return (
    <>
      <div>
        {type === config.double.opened && (
          <StyledSexSection>
            <SexSection setting={sex} setHandler={setSex} />
          </StyledSexSection>
        )}

        <InputSection
          current={current}
          doubled={doubled}
          setCurrentHandler={setCurrent}
          setDoubledHandler={setDoubled}
          type={type}
        />
        <ConfirmButtonsWrapper>
          <ConfirmButton onClick={generateTemplateHandler} />
          <ClearButton onClick={clearFields} />
        </ConfirmButtonsWrapper>
      </div>
      <MainTextarea value={template} setTemplate={setTemplate} />
    </>
  );
};
export default Double;
