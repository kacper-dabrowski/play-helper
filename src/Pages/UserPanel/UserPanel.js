import React from 'react';
import { Switch } from 'react-router';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SrqPanel from './SrqPanel/SrqPanel';

const UserPanel = () => {
    return (
        <SupportLayout routes={routes.userPanel} backgroundImage={backgroundImage}>
            <Switch>
                <PrivateRoute path={routes.userPanel.solution.path}>
                    <div />
                </PrivateRoute>
                <PrivateRoute path={routes.userPanel.srq.path}>
                    <SrqPanel />
                </PrivateRoute>
            </Switch>
        </SupportLayout>
    );
};

export default UserPanel;
