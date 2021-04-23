import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
    const renderRoute = () => {
        if (!isAuthenticated) {
            return <NotFoundPage />;
        }

        return props.children;
    };

    return <Route {...props} render={renderRoute} />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps, null)(PrivateRoute);
