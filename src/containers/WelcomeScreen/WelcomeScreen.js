import React, { useState } from "react";
import ProjectTile from "./ProjectTile/ProjectTile";
import { WelcomeScreenContainer } from "./StyledWelcomeScreen";
import arrowLeft from "../../assets/icons/left-arrow.svg";
import arrowRight from "../../assets/icons/right-arrow.svg";
import LoginModal from "../../components/Modals/LoginModal/LoginModal";
import SignupModal from "../../components/Modals/SignupModal/SignupModal";

import Topbar from "./Topbar/Topbar";
import { connect } from "react-redux";

const WelcomeScreen = (props) => {
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
        isAuthenticated={props.isAuthenticated}
        fullName={props.fullName}
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
        <SignupModal
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
const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
  fullName: state.auth.fullName,
});

export default connect(mapStateToProps, null)(WelcomeScreen);
