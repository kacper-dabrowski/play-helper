import React from 'react';
import { Route } from 'react-router';

const PublicRoute = (props) => {
    return <Route {...props}>{props.children}</Route>;
};

export default PublicRoute;
