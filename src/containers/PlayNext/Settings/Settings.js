import React from "react";
import BorderButton from "../../../components/BorderButton/BorderButton";
import PlayNextButton from "../../../components/PlayNextButton/PlayNextButton";
import { StyledPlayNextSettings } from "./StyledSettings";

const Settings = () => {
  return (
    <StyledPlayNextSettings>
      <PlayNextButton title={"Przywitaj się"} />
      <PlayNextButton title={"Usuń konto"} />
      <PlayNextButton title={"Zgłoszenie"} />
      <PlayNextButton title={"Migracja"} />
      <PlayNextButton title={"Roaming"} />
      <PlayNextButton title={"QoS"} />
      <PlayNextButton title={"Brak odpowiedzi"} />
      <PlayNextButton title={"Zakończ rozmowę"} />
      <PlayNextButton title={"+ Dopytaj"} />
      <PlayNextButton title={"+ Ocena pracy"} />
      <BorderButton
        title={"Pan"}
        mainColor={"#0ff"}
        secondColor={"pink"}
        isClicked
      />
      <BorderButton
        title={"Pan"}
        mainColor={"#f66"}
        secondColor={"#fada79"}
        isClicked
      />
    </StyledPlayNextSettings>
  );
};

export default Settings;
