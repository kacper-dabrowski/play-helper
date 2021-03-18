import React from 'react';
import { Route, Switch } from 'react-router';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const NotFoundProviderSwitch = ({ children }) => (
    <Switch>
        {children}
        <Route path="*">
            <NotFoundPage />
        </Route>
    </Switch>
);

export default NotFoundProviderSwitch;
