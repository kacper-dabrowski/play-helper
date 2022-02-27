import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../../../../../shared/colors';

export const StyledNavlink = styled(NavLink)`
    text-decoration: none;
    color: ${({ theme }) => theme.fontColor.primary};
    padding: 0.5rem;
    &:hover,
    &:active,
    &:focus {
        color: ${colors.navlinkActive};
    }
    &.active {
        color: ${colors.navlinkActive};
    }
`;
