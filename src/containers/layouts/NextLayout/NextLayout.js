import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from './StyledNextLayout';
import Navbar from '../../../components/UI/Navbars/PageNavbar/Navbar';
import { BaseLayout } from '../BaseLayout/BaseLayout';

export const NextLayout = ({ children, routes, backgroundImage }) => {
    const authStore = useSelector((state) => state.auth);
    return (
        <>
            <BaseLayout backgroundImage={backgroundImage}>
                <Navbar routes={routes} username={authStore.user.fullName} />
                <Container>{children}</Container>
            </BaseLayout>
        </>
    );
};
