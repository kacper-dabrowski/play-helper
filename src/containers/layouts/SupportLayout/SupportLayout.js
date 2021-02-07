import React from 'react';
import { connect } from 'react-redux';
import { StyledSupportLayout } from './StyledSupportLayout';
import Navbar from '../../../components/UI/Navbars/PageNavbar/Navbar';

const SupportLayout = ({ children, routes, fullName }) => {
    return (
        <StyledSupportLayout>
            <Navbar routes={routes} username={fullName} />
            {children}
        </StyledSupportLayout>
    );
};
const mapStateToProps = (state) => ({
    fullName: state.auth.fullName,
});
export default connect(mapStateToProps, null)(SupportLayout);
