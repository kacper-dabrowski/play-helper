import React from 'react';
import Navbar from '../../containers/PlayNext/Navbar/Navbar';
import { StyledSupportLayout } from './StyledSupportLayout';

const SupportLayout = ({ children, routes, username }) => {
    return (
        <StyledSupportLayout>
            <Navbar routes={routes} username={username} />
            {children}
        </StyledSupportLayout>
    );
};

export default SupportLayout;
