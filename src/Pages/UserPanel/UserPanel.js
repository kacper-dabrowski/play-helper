import React, { useCallback } from 'react';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SrqPanel from './SrqPanel/SrqPanel';
import Solution from './Solution/Solution';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import { useStore } from '../../hooks/useStore';
import { fetchSupportRequests } from '../../stores/user/user';
import { fetchSolutions, removeSolution } from '../../stores/solutions/solutions';

const UserPanel = () => {
    const { userStore, solutionsStore, dispatch } = useStore();

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
                        requestStatus={solutionsStore.fetchSolutionsRequest}
                        solutions={solutionsStore.solutions}
                        refreshSolutions={onFetchSolutions}
                        onRemoveSolution={onRemoveSolution}
                        deletionRequestStatus={solutionsStore.removeSolutionRequest}
                    />
                </PrivateRoute>
                <PrivateRoute exact path={routes.userPanel.srq.path}>
                    <SrqPanel
                        onFetchSupportRequests={onFetchSupportRequests}
                        supportRequests={userStore.supportRequests}
                        requestStatus={solutionsStore.fetchSolutionsRequest}
                    />
                </PrivateRoute>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default UserPanel;
