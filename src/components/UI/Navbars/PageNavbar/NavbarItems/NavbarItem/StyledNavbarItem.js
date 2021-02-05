import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavlink = styled(NavLink)`
    text-decoration: none;
    color: white;
    padding: 0.5rem;
    &:hover {
        color: #a98dd0;
    }
    &.active {
        color: #a98dd0;
    }
`;
