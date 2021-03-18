import React from 'react';
import { connect } from 'react-redux';
import { Container, StyledSupportLayout } from './StyledSupportLayout';
import Navbar from '../../../components/UI/Navbars/PageNavbar/Navbar';

const SupportLayout = ({ children, routes, fullName, backgroundImage }) => {
    return (
        <>
            <StyledSupportLayout backgroundImage={backgroundImage}>
                <Navbar routes={routes} username={fullName} />
                <Container>{children}</Container>
            </StyledSupportLayout>
        </>
    );
};
const mapStateToProps = (state) => ({
    fullName: state.auth.fullName,
});
export default connect(mapStateToProps, null)(SupportLayout);
