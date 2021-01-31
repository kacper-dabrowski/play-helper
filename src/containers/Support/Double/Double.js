import React, { useCallback, useEffect, useState } from "react";
import ConfirmButtons from "../../../components/ConfirmButtons/ConfirmButtons";
import MainTextarea from "../../../components/MainTextarea/MainTextarea";
import SexSection from "../../../components/SexSection/SexSection";
import ErrorBadge from "../../../components/UI/ErrorBadge/ErrorBadge";
import generateOpenedDoubleTemplate from "../../../modules/closedDouble/closedDouble";
import generateClosedDoubleTemplate from "../../../modules/openedDouble/openedDouble";
import config from "../../../shared/identifiers";
import InputSection from "./Sections/InputSection";
import { StyledSexSection } from "./StyledDouble";

const Double = ({ type }) => {
  const [sex, setSex] = useState("");
  const [current, setCurrent] = useState("");
  const [doubled, setDoubled] = useState("");
  const [template, setTemplate] = useState("");
  const [error, setError] = useState(null);

  const clearFields = useCallback(() => {
    setSex(null);
    setTemplate("");
    setDoubled("");
    setCurrent("");
  }, []);

  useEffect(() => clearFields(), [clearFields, type]);

  const generateTemplateHandler = useCallback(() => {
    try {
      let template;
      switch (type) {
        case config.double.opened:
          template = generateOpenedDoubleTemplate(current, doubled);
          break;
        case config.double.closed:
          template = generateClosedDoubleTemplate(sex, current, doubled);
          break;
        default:
          throw new Error("Invalid double type");
      }

      setTemplate(template);
    } catch (error) {
      setError(error);
    }
  }, [type, doubled, current, sex]);

  return (
    <>
      <div>
        <ErrorBadge
          message={error?.message}
          deleteError={() => setError(null)}
        />
        {type === config.double.closed && (
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
        <ConfirmButtons
          onClearFields={clearFields}
          onGenerateTemplate={generateTemplateHandler}
        />
      </div>
      <MainTextarea value={template} setTemplate={setTemplate} />
    </>
  );
};
export default Double;
