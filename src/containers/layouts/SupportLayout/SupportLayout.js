import React from 'react';
import { useSelector } from 'react-redux';
import * as Styled from './StyledSupportLayout';
import Navbar from '../../../components/UI/Navbars/PageNavbar/Navbar';
import { BaseLayout } from '../BaseLayout/BaseLayout';

const SupportLayout = ({ children, routes, backgroundImage }) => {
    const fullName = useSelector((state) => state.auth.fullName);

    return (
        <>
            <BaseLayout backgroundImage={backgroundImage}>
                <Navbar routes={routes} username={fullName} />
                <Styled.Container>{children}</Styled.Container>
            </BaseLayout>
        </>
    );
};

export default SupportLayout;
