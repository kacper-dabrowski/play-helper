import React from 'react';
import { Container } from './StyledNextLayout';
import Navbar from '../../../components/UI/Navbars/PageNavbar/Navbar';
import { BaseLayout } from '../BaseLayout/BaseLayout';
import { useStore } from '../../../stores/stores';

export const NextLayout = ({ children, routes, backgroundImage }) => {
    const { authStore } = useStore();

    return (
        <>
            <BaseLayout backgroundImage={backgroundImage}>
                <Navbar routes={routes} username={authStore.user.fullName} />
                <Container>{children}</Container>
            </BaseLayout>
        </>
    );
};
