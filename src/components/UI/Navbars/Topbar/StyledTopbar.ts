import styled from '@emotion/styled';

export const TopbarContainer = styled.div`
    width: 95%;
    position: absolute;
    top: ${({ theme }) => theme.spacing.medium};
    left: ${({ theme }) => theme.spacing.medium};
    height: 60px;
    display: flex;
    align-items: center;
    z-index: 11;
`;

interface TopbarIconButtonProps {
    icon: string;
}

export const TopbarIconButton = styled.button<TopbarIconButtonProps>`
    width: 1.5rem;
    height: 1.5rem;
    transition: ease-in-out 1s;
    background: url('${({ icon }) => icon}');
    background-size: cover;
    border: none;
    &:hover {
        cursor: pointer;
        transform: rotate(90deg);
    }
`;
