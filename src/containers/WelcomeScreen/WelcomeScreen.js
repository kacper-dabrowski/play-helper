import React from "react";
import ProjectTile from "./ProjectTile/ProjectTile";
import { WelcomeScreenContainer } from "./StyledWelcomeScreen";
import arrowLeft from "../../assets/icons/left-arrow.svg";
import arrowRight from "../../assets/icons/right-arrow.svg";

const WelcomeScreen = () => (
  <WelcomeScreenContainer>
    <ProjectTile
      projectColor={"#303030"}
      projectLogo={arrowLeft}
      projectText={"PLAY NEXT"}
    />
    <ProjectTile
      projectColor={"#180f25"}
      projectLogo={arrowRight}
      projectText={"Druga Linia"}
    />
  </WelcomeScreenContainer>
);

export default WelcomeScreen;
