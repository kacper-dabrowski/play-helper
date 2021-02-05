import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../containers/PlayNext/Navbar/Navbar';
import { StyledSupportLayout } from './StyledSupportLayout';

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
