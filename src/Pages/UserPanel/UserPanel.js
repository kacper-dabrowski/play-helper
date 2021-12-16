import React from 'react';
import { observer } from 'mobx-react-lite';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import { useStore } from '../../stores/stores';
import SrqPanel from './SrqPanel/SrqPanel';

const UserPanel = observer(() => {
    const { supportRequestsStore } = useStore();

    return (
        <SupportLayout routes={routes.userPanel} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <PrivateRoute exact path={routes.userPanel.main.path} />
                <PrivateRoute exact path={routes.userPanel.solution.path}>
                    {/* <Solution
                        onFetchSolutions={onFetchSolutions}
                        requestStatus={solutionsStore.fetchSolutionsRequest}
                        solutions={solutionsStore.solutions}
                        refreshSolutions={onFetchSolutions}
                        onRemoveSolution={}
                        deletionRequestStatus={solutionsStore.removeSolutionRequest}
                        onAddSolution={onAddSolution}
                        addSolutionRequest={solutionsStore.addSolutionRequest}
                    /> */}
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
