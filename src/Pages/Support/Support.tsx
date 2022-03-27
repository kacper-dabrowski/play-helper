import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import { DoubledNotificationType } from '../../shared/identifiers';
import routes from '../../shared/routes';
import { StoreState } from '../../stores/store';
import { SolutionPicker } from '../../userPanel/solutions/solutionsPicker';
import { SupportRequestsPicker } from '../../userPanel/supportRequests/supportRequestsPicker';
import { BasicContainer } from './Basic/BasicContainer';
import Double from './Double/Double';
import Payments from './Payments/Payments';

const Support: FC = () => {
    const fullName = useSelector((state: StoreState) => state.auth.user.fullName);
    const settings = useSelector((state: StoreState) => state.user.settings);

    return (
        <SupportLayout routes={routes.support} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <Route exact path={routes.support.srq.path}>
                    <SupportRequestsPicker />
                </Route>
                <Route exact path={routes.support.basic.path}>
                    <BasicContainer name={fullName} />
                </Route>
                <Route exact path={routes.support.doubleOpened.path}>
                    <Double type={DoubledNotificationType.Opened} />
                </Route>
                <Route exact path={routes.support.doubleClosed.path}>
                    <Double type={DoubledNotificationType.Closed} />
                </Route>
                <Route exact path={routes.support.payments.path}>
                    <Payments fullName={fullName} />
                </Route>
                <Route exact path={routes.support.solutions.path}>
                    <SolutionPicker />
                </Route>
                <Route exact path={routes.support.main.path}>
                    <Redirect to={settings?.startingPage || routes.support.basic.path} />
                </Route>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default Support;
