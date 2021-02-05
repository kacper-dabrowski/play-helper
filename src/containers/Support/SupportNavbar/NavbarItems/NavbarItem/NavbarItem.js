import React from 'react';
import { StyledNavlink } from './StyledNavbarItem';

const NavbarItem = (props) => (
    <StyledNavlink to={props.path} exact={props.exact}>
        {props.title}
    </StyledNavlink>
);

export default NavbarItem;
