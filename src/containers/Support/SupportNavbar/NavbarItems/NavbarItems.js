import React from 'react';
import routes from '../../../../shared/routes';
import NavbarItem from './NavbarItem/NavbarItem';
import { StyledNavbarItems } from './StyledNavbarItems';

const NavbarItems = () => (
    <StyledNavbarItems>
        <NavbarItem path={routes.support.basic} title="Zamknięcie zwykłe" exact />
        <NavbarItem path={routes.support.doubleOpened} title="Dubel do otwartego" exact />
        <NavbarItem path={routes.support.doubleClosed} title="Dubel do zamkniętego" exact />
        <NavbarItem path={routes.support.payments} title="Raty" exact />
        <NavbarItem path={routes.support.srq} title="SRQ" exact />
    </StyledNavbarItems>
);

export default NavbarItems;
