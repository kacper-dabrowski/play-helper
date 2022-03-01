import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import routes from '../../shared/routes';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import PrivateRoute from '../../components/Routes/PrivateRoute/PrivateRoute';
import SrqPanel from './SrqPanel/SrqPanel';
import { SolutionsEditor } from '../../userPanel/solutions/solutionsEditor';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import { fetchSupportRequests } from '../../userPanel/supportRequests/store/supportRequests';

const UserPanel = () => {
    const supportRequestsStore = useSelector((state) => state.supportRequests);
    const dispatch = useDispatch();

    const onFetchSupportRequests = useCallback(() => {
        dispatch(fetchSupportRequests());
    }, [dispatch]);

    return (
        <SupportLayout routes={routes.userPanel} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <PrivateRoute exact path={routes.userPanel.main.path} />
                <PrivateRoute exact path={routes.userPanel.solution.path}>
                    <SolutionsEditor />
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
