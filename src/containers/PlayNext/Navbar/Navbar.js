import React from 'react';
import ArrowBack from '../../../components/ArrowBack/ArrowBack';
import UserInfo from '../../../components/UserInfo/UserInfo';
import config from '../../../shared/identifiers';
import { StyledNavbar } from './StyledNavbar';

const Navbar = ({ username }) => {
    return (
        <StyledNavbar>
            <UserInfo username={username} />
            <ArrowBack type={config.projects.NEXT} />
        </StyledNavbar>
    );
};

export default Navbar;
