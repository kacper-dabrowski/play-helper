import React, { useState } from "react";
import ProjectTile from "./ProjectTile/ProjectTile";
import { WelcomeScreenContainer } from "./StyledWelcomeScreen";
import arrowLeft from "../../assets/icons/left-arrow.svg";
import arrowRight from "../../assets/icons/right-arrow.svg";
import LoginModal from "../../components/LoginModal/LoginModal";
import Topbar from "./Topbar/Topbar";
import SignUpModal from "../../components/SignupModal/SignupModal";

const WelcomeScreen = () => {
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [signInModalOpened, setSignInModalOpened] = useState(false);

  const openLoginModalHandler = () => {
    setLoginModalOpened(true);
  };
  const closeModalHandler = () => {
    setLoginModalOpened(false);
  };
  const openSignInModalHandler = () => {
    setSignInModalOpened(true);
  };
  const closeSignInModalHandler = () => {
    setSignInModalOpened(false);
  };
  return (
    <WelcomeScreenContainer>
      <Topbar
        onLoginModalOpened={openLoginModalHandler}
        onSignInModalOpened={openSignInModalHandler}
      />
      {loginModalOpened && (
        <LoginModal
          isOpened={loginModalOpened}
          closeModalHandler={closeModalHandler}
        />
      )}
      {signInModalOpened && (
        <SignUpModal
          isOpened={signInModalOpened}
          closeModalHandler={closeSignInModalHandler}
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
