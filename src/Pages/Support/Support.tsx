import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Redirect, Route } from 'react-router';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import { DoubledNotificationType } from '../../shared/identifiers';
import routes from '../../shared/routes';
import { useStore } from '../../stores/stores';
import { BasicContainer } from './Basic/BasicContainer';
import Double from './Double/Double';
import Payments from './Payments/Payments';
import Solutions from './Solutions/Solutions';
import Srq from './Srq/Srq';

const Support: FC = observer(() => {
    const { authStore, userStore, supportRequestsStore, solutionsStore } = useStore();
    const { settings } = userStore;

    return (
        <SupportLayout routes={routes.support} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <Route exact path={routes.support.srq.path}>
                    <Srq onFetchSupportRequests={supportRequestsStore.refreshSupportRequests} />
                </Route>
                <Route exact path={routes.support.basic.path}>
                    <BasicContainer />
                </Route>
                <Route exact path={routes.support.doubleOpened.path}>
                    <Double type={DoubledNotificationType.Opened} />
                </Route>
                <Route exact path={routes.support.doubleClosed.path}>
                    <Double type={DoubledNotificationType.Closed} />
                </Route>
                <Route exact path={routes.support.payments.path}>
                    <Payments fullName={authStore?.user?.fullName} />
                </Route>
                <Route exact path={routes.support.solutions.path}>
                    <Solutions
                        solutions={solutionsStore.solutions}
                        onFetchSolutions={solutionsStore.refreshSolutions}
                        requestStatus={solutionsStore.refreshSolutionsRequest}
                    />
                </Route>
                <Route exact path={routes.support.main.path}>
                    <Redirect to={settings?.startingPage || routes.support.basic.path} />
                </Route>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
});

export default Support;
