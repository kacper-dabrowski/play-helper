import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProjectTile from './ProjectTile/ProjectTile';
import { WelcomeScreenContainer } from './StyledWelcomeScreen';
import arrowLeft from '../../assets/icons/left-arrow.svg';
import arrowRight from '../../assets/icons/right-arrow.svg';
import LoginModal from '../../components/Modals/LoginModal/LoginModal';
import SignupModal from '../../components/Modals/SignupModal/SignupModal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Topbar from '../../components/UI/Navbars/Topbar/Topbar';

const WelcomeScreen = (props) => {
    const [loginModalOpened, setLoginModalOpened] = useState(false);
    const [signInModalOpened, setSignInModalOpened] = useState(false);

    return (
        <>
            <Backdrop isOpened={!props.isAuthenticated} />
            <WelcomeScreenContainer>
                <Topbar
                    isAuthenticated={props.isAuthenticated}
                    fullName={props.fullName}
                    onLoginModalOpened={() => setLoginModalOpened(true)}
                    onSignInModalOpened={() => setSignInModalOpened(true)}
                />
                <LoginModal isOpened={loginModalOpened} closeModalHandler={() => setLoginModalOpened(false)} />
                <SignupModal isOpened={signInModalOpened} closeModalHandler={() => setSignInModalOpened(false)} />
                <ProjectTile
                    projectEndpoint="/next"
                    projectColorDark="#303030"
                    projectColorBright="#009688"
                    projectLogo={arrowLeft}
                    projectText="PLAY NEXT"
                />
                <ProjectTile
                    projectEndpoint="/support"
                    projectColorDark="#180f25"
                    projectColorBright="#303030"
                    projectLogo={arrowRight}
                    projectText="Druga Linia"
                />
            </WelcomeScreenContainer>
        </>
    );
};
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
    fullName: state.auth.fullName,
});

export default connect(mapStateToProps, null)(WelcomeScreen);
