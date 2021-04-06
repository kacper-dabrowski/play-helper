import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
    return isAuthenticated ? <Route {...props}>{props.children}</Route> : null;
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps, null)(PrivateRoute);
