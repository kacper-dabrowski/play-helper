import React from 'react';
import NavbarItems from './NavbarItems/NavbarItems';
import { StyledNavbar } from './StyledNavbar';
import UserInfo from '../../../components/UserInfo/UserInfo';
import ArrowBack from '../../../components/ArrowBack/ArrowBack';

const Navbar = ({ username, routes }) => {
    return (
        <StyledNavbar>
            <ArrowBack />
            <NavbarItems routes={routes} />
            <UserInfo username={username} />
        </StyledNavbar>
    );
};

export default Navbar;
