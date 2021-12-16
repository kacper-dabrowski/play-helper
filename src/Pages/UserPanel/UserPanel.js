import { observer } from 'mobx-react-lite';
import React from 'react';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import { useStore } from '../../stores/stores';
import Solution from './Solution/Solution';
import SrqPanel from './SrqPanel/SrqPanel';

const UserPanel = observer(() => {
    const { supportRequestsStore, solutionsStore } = useStore();

    return (
        <SupportLayout routes={routes.userPanel} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <PrivateRoute exact path={routes.userPanel.main.path} />
                <PrivateRoute exact path={routes.userPanel.solution.path}>
                    <Solution
                        onFetchSolutions={solutionsStore.refreshSolutions}
                        requestStatus={solutionsStore.refreshSolutionsRequest}
                        solutions={solutionsStore.solutions}
                        refreshSolutions={solutionsStore.refreshSolutions}
                        onRemoveSolution={solutionsStore.removeSolution}
                        deletionRequestStatus={solutionsStore.removeSolutionRequest}
                        onAddSolution={solutionsStore.addSolution}
                        addSolutionRequest={solutionsStore.addSolutionRequest}
                        solutionUpdateRequest={solutionsStore.updateSolutionRequest}
                        onUpdateSolution={solutionsStore.updateSolution}
                    />
                </PrivateRoute>
                <PrivateRoute exact path={routes.userPanel.srq.path}>
                    <SrqPanel
                        onSupportRequestUpdate={supportRequestsStore.updateSupportRequest}
                        onRemoveSupportRequest={supportRequestsStore.removeSupportRequest}
                        removeSupportRequestRequest={supportRequestsStore.removeSupportRequestRequest}
                        onAddSupportRequest={supportRequestsStore.addSupportRequest}
                        addSupportRequestRequest={supportRequestsStore.addSupportRequestRequest}
                        onFetchSupportRequests={supportRequestsStore.refreshSupportRequests}
                        supportRequests={supportRequestsStore.supportRequests}
                        fetchSupportRequestsRequest={supportRequestsStore.fetchSupportRequestsRequest}
                        supportRequestUpdateRequestStatus={supportRequestsStore.updateSupportRequestRequest}
                    />
                </PrivateRoute>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
});

export default UserPanel;
