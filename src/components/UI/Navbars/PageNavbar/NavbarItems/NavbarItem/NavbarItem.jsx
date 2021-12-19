import React from 'react';
import { StyledNavlink } from './StyledNavbarItem';

const NavbarItem = ({ path, title, exact }) => (
    <StyledNavlink to={path} exact={exact}>
        {title}
    </StyledNavlink>
);

export default NavbarItem;
