import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Logout from '../../Logout/Logout';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
    return isAuthenticated ? <Route {...props}>{props.children}</Route> : <Logout />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps, null)(PrivateRoute);
