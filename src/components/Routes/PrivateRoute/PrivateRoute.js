import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
    return isAuthenticated ? <Route {...props}>{props.children}</Route> : <NotFoundPage />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps, null)(PrivateRoute);
