import React from 'react';
import UserInfo from '../../../UserInfo/UserInfo';
import { TopbarContainer, TopbarIconButton } from './StyledTopbar';
import { TopbarButton } from './TopbarButton/TopbarButton';
import { TopbarNavlink } from './TopbarNavlink/TopbarNavlink';
import settingsIcon from '../../../../assets/icons/settings.svg';

const Topbar = ({ onLoginModalOpened, onSignInModalOpened, onSettingsModalOpened, isAuthenticated, fullName }) => {
    const content = isAuthenticated ? (
        <>
            <TopbarNavlink to="/logout">Wyloguj</TopbarNavlink>
            <TopbarNavlink to="/user-panel" width="12rem">
                Panel użytkownika
            </TopbarNavlink>
            <TopbarIconButton icon={settingsIcon} onClick={onSettingsModalOpened} />
            <UserInfo rightCorner username={fullName} />
        </>
    ) : (
        <>
            <TopbarButton onClick={onLoginModalOpened}>Zaloguj</TopbarButton>
            <TopbarButton onClick={onSignInModalOpened}>Załóż konto</TopbarButton>
        </>
    );
    return <TopbarContainer>{content}</TopbarContainer>;
};

export default Topbar;
