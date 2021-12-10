import React, { useCallback } from 'react';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SrqPanel from './SrqPanel/SrqPanel';
import Solution from './Solution/Solution';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import { useStore } from '../../hooks/useStore';
import { removeSolution, fetchSolutions, addSolution } from '../../stores/solutions/solutions';
import {
    addSupportRequest,
    fetchSupportRequests,
    removeSupportRequests,
} from '../../stores/supportRequests/supportRequests';

const UserPanel = () => {
    const { dispatch, solutionsStore, supportRequestsStore } = useStore();

    const onFetchSolutions = useCallback(() => {
        dispatch(fetchSolutions());
    }, [dispatch]);

    const onFetchSupportRequests = useCallback(() => {
        dispatch(fetchSupportRequests());
    }, [dispatch]);

    const onRemoveSupportRequest = useCallback(
        (id) => {
            dispatch(removeSupportRequests({ srqId: id }));
        },
        [dispatch]
    );

    const onAddSupportRequest = useCallback(
        (payload) => {
            dispatch(addSupportRequest(payload));
        },
        [dispatch]
    );

    const onRemoveSolution = useCallback(
        (solutionId, onSuccess) => {
            dispatch(removeSolution({ solutionId, onSuccess }));
        },
        [dispatch]
    );

    const onAddSolution = useCallback(
        (payload) => {
            dispatch(addSolution(payload));
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
                        onAddSolution={onAddSolution}
                        addSolutionRequest={solutionsStore.addSolutionRequest}
                    />
                </PrivateRoute>
                <PrivateRoute exact path={routes.userPanel.srq.path}>
                    <SrqPanel
                        onRemoveSupportRequest={onRemoveSupportRequest}
                        removeSupportRequestRequest={supportRequestsStore.removeSupportRequestRequest}
                        onAddSupportRequest={onAddSupportRequest}
                        addSupportRequestRequest={supportRequestsStore.addSupportRequestRequest}
                        onFetchSupportRequests={onFetchSupportRequests}
                        supportRequests={supportRequestsStore.supportRequests}
                        fetchSupportRequestsRequest={supportRequestsStore.fetchSupportRequestsRequest}
                    />
                </PrivateRoute>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default UserPanel;
