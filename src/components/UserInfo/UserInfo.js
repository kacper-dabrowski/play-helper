import React from 'react';
import { StyledUserInfo, StyledUserInfoWrapper } from './StyledUserInfo';

const UserInfo = ({ username, rightCorner }) => {
    return (
        <StyledUserInfoWrapper rightCorner={rightCorner}>
            <StyledUserInfo>{username}</StyledUserInfo>
        </StyledUserInfoWrapper>
    );
};

export default UserInfo;
