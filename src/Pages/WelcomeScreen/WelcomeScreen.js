import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import arrowLeft from '../../assets/icons/left-arrow.svg';
import arrowRight from '../../assets/icons/right-arrow.svg';
import SettingsModal from '../../components/Modals/SettingsModal/SettingsModal';
import Topbar from '../../components/UI/Navbars/Topbar/Topbar';
import { SplashScreen } from '../../components/UI/SplashScreen/SplashScreen';
import { WelcomeBackdrop } from '../../components/UI/WelcomeBackdrop/WelcomeBackdrop';
import { colors } from '../../shared/colors';
import { updateUserSettings } from '../../stores/user/user';
import ProjectTile from './ProjectTile/ProjectTile';
import { WelcomeScreenContainer } from './StyledWelcomeScreen';

const WelcomeScreen = () => {
    const authStore = useSelector((state) => state.auth);
    const userStore = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const isAuthenticated = Boolean(authStore?.user?.token);
    const fullName = authStore?.user?.fullName;

    const onSettingsUpdate = (payload) => dispatch(updateUserSettings(payload));

    const [settingsModalOpened, setSettingsModalOpened] = useState(false);

    if (userStore.fetchUserRequestStatus.loading) {
        return <SplashScreen />;
    }

    return (
        <>
            <WelcomeBackdrop isOpened={!isAuthenticated} />
            <WelcomeScreenContainer>
                <Topbar
                    isAuthenticated={isAuthenticated}
                    fullName={fullName}
                    onSettingsModalOpened={() => setSettingsModalOpened(true)}
                />

                <SettingsModal
                    isOpened={settingsModalOpened}
                    onSettingsUpdate={onSettingsUpdate}
                    userSettings={userStore.settings}
                    settingsUpdateRequest={userStore.settingsUpdateRequest}
                    closeModalHandler={() => setSettingsModalOpened(false)}
                />
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
