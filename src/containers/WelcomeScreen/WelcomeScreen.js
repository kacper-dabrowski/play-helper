import React from "react";
import ProjectTile from "./ProjectTile/ProjectTile";
import { WelcomeScreenContainer } from "./StyledWelcomeScreen";
import arrowLeft from "../../assets/icons/left-arrow.svg";
import arrowRight from "../../assets/icons/right-arrow.svg";

const WelcomeScreen = () => (
  <WelcomeScreenContainer>
    <ProjectTile
      projectEndpoint={"/next"}
      projectColorDark={"#303030"}
      projectColorBright={"#009688"}
      projectLogo={arrowLeft}
      projectText={"PLAY NEXT"}
    />
    <ProjectTile
      projectEndpoint={"/support"}
      projectColorDark={"#180f25"}
      projectColorBright={"#303030"}
      projectLogo={arrowRight}
      projectText={"Druga Linia"}
    />
  </WelcomeScreenContainer>
);

export default WelcomeScreen;
