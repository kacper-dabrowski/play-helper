import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';
import config from '../../shared/identifiers';
import Basic from './Basic/Basic';
import Double from './Double/Double';
import Payments from './Payments/Payments';
import Srq from './Srq/Srq';
import backgroundImage from '../../assets/backgrounds/support-wave.svg';
import Solutions from './Solutions/Solutions';
import NotFoundProviderSwitch from '../../components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import routes from '../../shared/routes';

const Support = () => {
    const { fullName } = useSelector((state) => ({
        fullName: state.auth.fullName,
        isAuthenticated: Boolean(state.auth.token),
    }));
    const startingPage = useSelector((state) => state.user?.settings?.startingPage);
    const basicTemplateValues = useSelector((state) => state.basicTemplates);
    const basicTemplateDispatch = useDispatch();

    return (
        <SupportLayout routes={routes.support} backgroundImage={backgroundImage}>
            <NotFoundProviderSwitch>
                <Route exact path={routes.support.srq.path}>
                    <Srq />
                </Route>
                <Route exact path={routes.support.basic.path}>
                    <Basic name={fullName} storeValues={basicTemplateValues} storeDispatch={basicTemplateDispatch} />
                </Route>
                <Route exact path={routes.support.doubleOpened.path}>
                    <Double type={config.double.opened} />
                </Route>
                <Route exact path={routes.support.doubleClosed.path}>
                    <Double type={config.double.closed} />
                </Route>
                <Route exact path={routes.support.payments.path}>
                    <Payments />
                </Route>
                <Route exact path={routes.support.solutions.path}>
                    <Solutions />
                </Route>
                <Route exact path={routes.support.main.path}>
                    <Redirect to={startingPage || routes.support.basic.path} />
                </Route>
            </NotFoundProviderSwitch>
        </SupportLayout>
    );
};

export default Support;
