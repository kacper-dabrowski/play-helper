import React, { FC, useCallback } from 'react';
import { Redirect, Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import config from '../../shared/identifiers';
import Double from './Double/Double';
import Payments from './Payments/Payments';
import Srq from './Srq/Srq';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import Solutions from './Solutions/Solutions';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import routes from '../../shared/routes';
import { BasicContainer } from './Basic/BasicContainer';
import { fetchSolutions } from '../../userPanel/solutions/store/solutions';
import { StoreState } from '../../stores/store';
import { fetchSupportRequests } from '../../userPanel/supportRequests/store/supportRequests';

const Support: FC = () => {
    const dispatch = useDispatch();
    const solutionsStore = useSelector((state: StoreState) => state.solutions);
    const userStore = useSelector((state: StoreState) => state.user);
    const authStore = useSelector((state: StoreState) => state.auth);

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
                    <Solutions
                        solutions={solutionsStore.solutions}
                        onFetchSolutions={onFetchSolutions}
                        requestStatus={solutionsStore.fetchSolutionsStatus}
                    />
                </Route>
                <Route exact path={routes.support.main.path}>
                    <Redirect to={userStore?.settings?.startingPage || routes.support.basic.path} />
                </Route>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default Support;
