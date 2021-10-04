import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from './StyledNextLayout';
import Navbar from '../../../components/UI/Navbars/PageNavbar/Navbar';
import { BaseLayout } from '../BaseLayout/BaseLayout';

export const NextLayout = ({ children, routes, backgroundImage }) => {
    const fullName = useSelector((state) => state.auth.user.fullName);

    return (
        <>
            <BaseLayout backgroundImage={backgroundImage}>
                <Navbar routes={routes} username={fullName} />
                <Container>{children}</Container>
            </BaseLayout>
        </>
    );
};
