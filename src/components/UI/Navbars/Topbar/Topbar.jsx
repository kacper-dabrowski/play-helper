import React from 'react';
import UserInfo from '../../../UserInfo/UserInfo';
import { TopbarContainer, TopbarIconButton } from './StyledTopbar';
import { TopbarNavlink } from './TopbarNavlink/TopbarNavlink';
import settingsIcon from '../../../../assets/icons/settings.svg';

const Topbar = ({ onSettingsModalOpened, isAuthenticated, fullName }) => {
    const content = isAuthenticated ? (
        <>
            <UserInfo rightCorner username={fullName} />
            <TopbarNavlink to="/logout">Wyloguj</TopbarNavlink>
            <TopbarNavlink width="12rem" to="/user-panel">
                Panel użytkownika
            </TopbarNavlink>
            <TopbarIconButton data-testid="icon-button" icon={settingsIcon} onClick={onSettingsModalOpened} />
        </>
    ) : null;
    return <TopbarContainer>{content}</TopbarContainer>;
};

export default Topbar;
