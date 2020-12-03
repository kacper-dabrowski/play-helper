import React, { useState } from "react";
import ProjectTile from "./ProjectTile/ProjectTile";
import { WelcomeScreenContainer } from "./StyledWelcomeScreen";
import arrowLeft from "../../assets/icons/left-arrow.svg";
import arrowRight from "../../assets/icons/right-arrow.svg";
import LoginModal from "../../components/LoginModal/LoginModal";
import Topbar from "./Topbar/Topbar";

const WelcomeScreen = () => {
  const [loginModalOpened, setLoginModalOpened] = useState(false);

  const openLoginModalHandler = () => {
    setLoginModalOpened(true);
  };
  const closeModalHandler = () => {
    setLoginModalOpened(false);
  };
  return (
    <WelcomeScreenContainer>
      <Topbar onLoginModalOpened={openLoginModalHandler} />
      {loginModalOpened && (
        <LoginModal
          isOpened={loginModalOpened}
          closeModalHandler={closeModalHandler}
        />
      )}
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
};

export default WelcomeScreen;
