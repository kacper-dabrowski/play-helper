import React, { FC } from 'react';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import { SolutionsEditor } from '../../userPanel/solutions/solutionsEditor';
import { SupportRequestsEditor } from '../../userPanel/supportRequests/supportRequestsEditor';

const UserPanel: FC = () => {
    return (
        <SupportLayout routes={routes.userPanel} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <PrivateRoute exact path={routes.userPanel.main.path} />
                <PrivateRoute exact path={routes.userPanel.solution.path}>
                    <SolutionsEditor />
                </PrivateRoute>
                <PrivateRoute exact path={routes.userPanel.srq.path}>
                    <SupportRequestsEditor />
                </PrivateRoute>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default UserPanel;
