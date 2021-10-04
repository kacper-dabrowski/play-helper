import React, { useEffect } from 'react';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SrqPanel from './SrqPanel/SrqPanel';
import Solution from './Solution/Solution';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import { useStore } from '../../hooks/useStore';
import { fetchSolutions } from '../../stores/user/user';

const UserPanel = () => {
    const { userStore, dispatch } = useStore();

    const onFetchSolutions = () => {
        dispatch(fetchSolutions());
    };

    useEffect(() => {
        onFetchSolutions();
    }, []);

    return (
        <SupportLayout routes={routes.userPanel} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <PrivateRoute exact path={routes.userPanel.main.path} />
                <PrivateRoute exact path={routes.userPanel.solution.path}>
                    <Solution
                        requestStatus={userStore.fetchSolutionsRequest}
                        solutions={userStore.solutions}
                        refreshSolutions={onFetchSolutions}
                    />
                </PrivateRoute>
                <PrivateRoute exact path={routes.userPanel.srq.path}>
                    <SrqPanel />
                </PrivateRoute>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default UserPanel;
