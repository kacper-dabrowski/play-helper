import React from 'react';
import ArrowBack from '../../../components/ArrowBack/ArrowBack';
import UserInfo from '../../../components/UserInfo/UserInfo';
import NavbarItems from '../../../components/UI/Navbars/SupportNavbar/NavbarItems/NavbarItems';
import { StyledNavbar } from './StyledNavbar';

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
