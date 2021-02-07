import styled from 'styled-components';

export const StyledProjectTile = styled.div`
    background: linear-gradient(-45deg, ${({ colorDark }) => colorDark}, ${({ colorBright }) => colorBright});
    background-size: 400% 400%;
    animation: gradient 7s ease infinite;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    &:hover {
        background: linear-gradient(-45deg, ${({ colorBright }) => colorBright}, ${({ colorDark }) => colorDark});
        background-size: 400% 400%;
        animation: gradient 7s ease infinite;
    }
`;
export const ProjectIcon = styled.img`
    width: 6rem;
    height: 6rem;
`;
