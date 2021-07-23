import React from 'react';
import { useSelector } from 'react-redux';
import { Container, StyledSupportLayout } from './StyledSupportLayout';
import Navbar from '../../../components/UI/Navbars/PageNavbar/Navbar';

const SupportLayout = ({ children, routes, backgroundImage }) => {
    const fullName = useSelector((state) => state.auth.fullName);

    return (
        <>
            <StyledSupportLayout backgroundImage={backgroundImage}>
                <Navbar routes={routes} username={fullName} />
                <Container>{children}</Container>
            </StyledSupportLayout>
        </>
    );
};

export default SupportLayout;
