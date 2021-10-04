import React, { useState } from 'react';
import arrowLeft from '../../assets/icons/left-arrow.svg';
import arrowRight from '../../assets/icons/right-arrow.svg';
import LoginModal from '../../components/Modals/LoginModal/LoginModal';
import SettingsModal from '../../components/Modals/SettingsModal/SettingsModal';
import SignupModal from '../../components/Modals/SignupModal/SignupModal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Topbar from '../../components/UI/Navbars/Topbar/Topbar';
import ProjectTile from './ProjectTile/ProjectTile';
import { WelcomeScreenContainer } from './StyledWelcomeScreen';
import { colors } from '../../shared/colors';
import { useStore } from '../../hooks/useStore';
import { registerUser } from '../../stores/auth/auth';

const WelcomeScreen = () => {
    const { authStore, dispatch } = useStore();
    const [loginModalOpened, setLoginModalOpened] = useState(false);
    const [signInModalOpened, setSignInModalOpened] = useState(false);
    const [settingsModalOpened, setSettingsModalOpened] = useState(false);
    const isAuthenticated = Boolean(authStore?.user?.token);
    const fullName = authStore?.user?.fullName;
    const onRegisterUser = (payload) => dispatch(registerUser(payload));

    return (
        <>
            <Backdrop isOpened={!isAuthenticated} />
            <WelcomeScreenContainer>
                <Topbar
                    isAuthenticated={isAuthenticated}
                    fullName={fullName}
                    onLoginModalOpened={() => setLoginModalOpened(true)}
                    onSignInModalOpened={() => setSignInModalOpened(true)}
                    onSettingsModalOpened={() => setSettingsModalOpened(true)}
                />
                <LoginModal isOpened={loginModalOpened} closeModalHandler={() => setLoginModalOpened(false)} />
                <SignupModal
                    isOpened={signInModalOpened}
                    closeModalHandler={() => setSignInModalOpened(false)}
                    onRegisterUser={onRegisterUser}
                    requestStatus={authStore.registrationRequest}
                />
                <SettingsModal isOpened={settingsModalOpened} closeModalHandler={() => setSettingsModalOpened(false)} />
                <ProjectTile
                    projectEndpoint="/next"
                    projectColorDark={colors.projectSpecificColors.playNext.colorDark}
                    projectColorBright={colors.projectSpecificColors.playNext.colorBright}
                    projectLogo={arrowLeft}
                    projectText="PLAY NEXT"
                />
                <ProjectTile
                    projectEndpoint="/support"
                    projectColorDark={colors.projectSpecificColors.support.colorDark}
                    projectColorBright={colors.mainBackground}
                    projectLogo={arrowRight}
                    projectText="Druga Linia"
                />
            </WelcomeScreenContainer>
        </>
    );
};

export default WelcomeScreen;
