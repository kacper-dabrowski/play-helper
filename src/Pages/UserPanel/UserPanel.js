import React, { useCallback } from 'react';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SrqPanel from './SrqPanel/SrqPanel';
import Solution from './Solution/Solution';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import { useStore } from '../../hooks/useStore';
import { fetchSolutions, fetchSupportRequests, removeSolution } from '../../stores/user/user';

const UserPanel = () => {
    const { userStore, dispatch } = useStore();

    const onFetchSolutions = useCallback(() => {
        dispatch(fetchSolutions());
    }, [dispatch]);

    const onFetchSupportRequests = useCallback(() => {
        dispatch(fetchSupportRequests());
    }, [dispatch]);

    const onRemoveSolution = useCallback(
        (solutionId, onSuccess) => {
            dispatch(removeSolution({ solutionId, onSuccess }));
        },
        [dispatch]
    );

    return (
        <SupportLayout routes={routes.userPanel} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <PrivateRoute exact path={routes.userPanel.main.path} />
                <PrivateRoute exact path={routes.userPanel.solution.path}>
                    <Solution
                        onFetchSolutions={onFetchSolutions}
                        requestStatus={userStore.fetchSolutionsRequest}
                        solutions={userStore.solutions}
                        refreshSolutions={onFetchSolutions}
                        onRemoveSolution={onRemoveSolution}
                        deletionRequestStatus={userStore.removeSolutionRequest}
                    />
                </PrivateRoute>
                <PrivateRoute exact path={routes.userPanel.srq.path}>
                    <SrqPanel
                        onFetchSupportRequests={onFetchSupportRequests}
                        supportRequests={userStore.supportRequests}
                        requestStatus={userStore.fetchSolutionsRequest}
                    />
                </PrivateRoute>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default UserPanel;
