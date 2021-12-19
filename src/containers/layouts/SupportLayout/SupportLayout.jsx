import React from 'react';
import * as Styled from './StyledSupportLayout';
import Navbar from '../../../components/UI/Navbars/PageNavbar/Navbar';
import { BaseLayout } from '../BaseLayout/BaseLayout';
import { useStore } from '../../../stores/stores';

const SupportLayout = ({ children, routes, backgroundImage }) => {
    const { authStore } = useStore();

    return (
        <BaseLayout backgroundImage={backgroundImage}>
            <Navbar routes={routes} username={authStore.user.fullName} />
            <Styled.Container>{children}</Styled.Container>
        </BaseLayout>
    );
};

export default SupportLayout;
