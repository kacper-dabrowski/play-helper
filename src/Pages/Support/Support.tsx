import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import config from '../../shared/identifiers';
import routes from '../../shared/routes';
import { StoreState } from '../../stores/store';
import { SolutionPicker } from '../../userPanel/solutions/solutionsPicker';
import { fetchSupportRequests } from '../../userPanel/supportRequests/store/supportRequests';
import { BasicContainer } from './Basic/BasicContainer';
import Double from './Double/Double';
import Payments from './Payments/Payments';
import Srq from './Srq/Srq';

const Support: FC = () => {
    const dispatch = useDispatch();
    const userStore = useSelector((state: StoreState) => state.user);
    const authStore = useSelector((state: StoreState) => state.auth);

    const onFetchSupportRequests = useCallback(() => {
        dispatch(fetchSupportRequests());
    }, [dispatch]);

    return (
        <SupportLayout routes={routes.support} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <Route exact path={routes.support.srq.path}>
                    <Srq onFetchSupportRequests={onFetchSupportRequests} />
                </Route>
                <Route exact path={routes.support.basic.path}>
                    <BasicContainer name={authStore.user.fullName} />
                </Route>
                <Route exact path={routes.support.doubleOpened.path}>
                    <Double type={config.double.opened} />
                </Route>
                <Route exact path={routes.support.doubleClosed.path}>
                    <Double type={config.double.closed} />
                </Route>
                <Route exact path={routes.support.payments.path}>
                    <Payments fullName={authStore.user.fullName} />
                </Route>
                <Route exact path={routes.support.solutions.path}>
                    <SolutionPicker />
                </Route>
                <Route exact path={routes.support.main.path}>
                    <Redirect to={userStore?.settings?.startingPage || routes.support.basic.path} />
                </Route>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default Support;
