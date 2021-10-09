import React, { useCallback } from 'react';
import { Redirect, Route } from 'react-router';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import config from '../../shared/identifiers';
import Double from './Double/Double';
import Payments from './Payments/Payments';
import Srq from './Srq/Srq';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import Solutions from './Solutions/Solutions';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import routes from '../../shared/routes';
import { useStore } from '../../hooks/useStore';
import { fetchSolutions, fetchSupportRequests } from '../../stores/user/user';
import { BasicContainer } from './Basic/BasicContainer';

const Support = () => {
    const { authStore, dispatch, userStore } = useStore();
    const { settings } = userStore;

    const onFetchSolutions = useCallback(() => {
        dispatch(fetchSolutions());
    }, [dispatch]);

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
                    <BasicContainer name={authStore.fullName} />
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
                    <Solutions
                        solutions={userStore.solutions}
                        onFetchSolutions={onFetchSolutions}
                        requestStatus={userStore.fetchSolutionsRequest}
                    />
                </Route>
                <Route exact path={routes.support.main.path}>
                    <Redirect to={settings?.startingPage || routes.support.basic.path} />
                </Route>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default Support;
