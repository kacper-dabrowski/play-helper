import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const PrivateRoute = ({ ...props }) => {
    const isAuthenticated = useSelector((state) => !!state.auth.token);

    const renderRoute = () => {
        if (!isAuthenticated) {
            return <NotFoundPage />;
        }

        return props.children;
    };

    return <Route {...props}>{renderRoute()}</Route>;
};

export default PrivateRoute;
