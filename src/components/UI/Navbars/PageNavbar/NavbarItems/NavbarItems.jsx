import React from 'react';
import NavbarItem from './NavbarItem/NavbarItem';
import { StyledNavbarItems } from './StyledNavbarItems';

const NavbarItems = ({ routes }) => {
    const routesEntries = Object.entries(routes);

    const renderedRoutes = routesEntries.map(
        ([, { path, exact, title }]) => title && <NavbarItem key={path} path={path} exact={exact} title={title} />
    );

    return <StyledNavbarItems>{renderedRoutes}</StyledNavbarItems>;
};

export default NavbarItems;
