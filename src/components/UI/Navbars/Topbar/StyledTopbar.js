import styled from 'styled-components';

export const TopbarContainer = styled.div`
    width: 95%;
    position: absolute;
    top: 1rem;
    left: 1rem;
    height: 60px;
    display: flex;
    align-items: center;
    z-index: 11;
`;

export const TopbarIconButton = styled.button`
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
