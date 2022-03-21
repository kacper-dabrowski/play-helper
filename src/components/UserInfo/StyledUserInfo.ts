import styled from '@emotion/styled';

interface StyledUserInfoWrapperProps {
    rightCorner: boolean;
}

export const StyledUserInfoWrapper = styled.div<StyledUserInfoWrapperProps>`
    width: 100%;
    height: 60px;
    right: ${({ theme }) => theme.spacing.medium};
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${({ rightCorner }) => rightCorner && `position: absolute; top:0; right:0; width:150px`}
`;

export const StyledUserInfo = styled.p`
    display: inline-block;
    width: 100%;
    color: lime;
`;
