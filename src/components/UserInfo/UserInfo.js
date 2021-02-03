import React from 'react';
import { StyledUserInfo, StyledUserInfoWrapper } from './StyledUserInfo';

const UserInfo = ({ username }) => {
    return (
        <StyledUserInfoWrapper>
            <StyledUserInfo>{username}</StyledUserInfo>
        </StyledUserInfoWrapper>
    );
};

export default UserInfo;
