import React, { useState } from "react";
import ProjectTile from "./ProjectTile/ProjectTile";
import { WelcomeScreenContainer } from "./StyledWelcomeScreen";
import arrowLeft from "../../assets/icons/left-arrow.svg";
import arrowRight from "../../assets/icons/right-arrow.svg";
import LoginModal from "../../components/Modals/LoginModal/LoginModal";
import SignupModal from "../../components/Modals/SignupModal/SignupModal";

import Topbar from "./Topbar/Topbar";
import { connect } from "react-redux";
import SrqModal from "../../components/Modals/SrqModal/SrqModal";

const WelcomeScreen = (props) => {
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [signInModalOpened, setSignInModalOpened] = useState(false);
  const [srqModalOpened, setSrqModalOpened] = useState(false);

  const openLoginModalHandler = () => {
    setLoginModalOpened(true);
  };
  const closeLoginModalHandler = () => {
    setLoginModalOpened(false);
  };
  const openSignInModalHandler = () => {
    setSignInModalOpened(true);
  };
  const closeSignInModalHandler = () => {
    setSignInModalOpened(false);
  };

  const openSrqModalHandler = () => {
    setSrqModalOpened(true);
  };
  const closeSrqModalHandler = () => {
    setSrqModalOpened(false);
  };

  return (
    <WelcomeScreenContainer>
      <Topbar
        isAuthenticated={props.isAuthenticated}
        fullName={props.fullName}
        onLoginModalOpened={openLoginModalHandler}
        onSignInModalOpened={openSignInModalHandler}
        onSrqModalOpened={openSrqModalHandler}
      />

      {loginModalOpened && (
        <LoginModal
          isOpened={loginModalOpened}
          closeModalHandler={closeLoginModalHandler}
        />
      )}
      {signInModalOpened && (
        <SignupModal
          isOpened={signInModalOpened}
          closeModalHandler={closeSignInModalHandler}
        />
      )}

      {srqModalOpened && (
        <SrqModal
          isOpened={srqModalOpened}
          closeModalHandler={closeSrqModalHandler}
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
