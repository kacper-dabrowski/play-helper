import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SrqPanel from './SrqPanel/SrqPanel';
import Solution from './Solution/Solution';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import { fetchSolutions } from '../../userPanel/solutions/store/solutions';
import { fetchSupportRequests } from '../../userPanel/supportRequests/store/supportRequests';

const UserPanel = () => {
    const supportRequestsStore = useSelector((state) => state.supportRequests);
    const solutionsStore = useSelector((state) => state.solutions);
    const dispatch = useDispatch();

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
                        requestStatus={solutionsStore.fetchSolutionsStatus}
                        solutions={solutionsStore.solutions}
                        refreshSolutions={onFetchSolutions}
                        onRemoveSolution={onRemoveSolution}
                        deletionRequestStatus={solutionsStore.removeSolutionStatus}
                    />
                </PrivateRoute>
                <PrivateRoute exact path={routes.userPanel.srq.path}>
                    <SrqPanel
                        onFetchSupportRequests={onFetchSupportRequests}
                        supportRequests={supportRequestsStore.supportRequests}
                        requestStatus={supportRequestsStore.fetchSupportRequestsStatus}
                    />
                </PrivateRoute>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default UserPanel;
