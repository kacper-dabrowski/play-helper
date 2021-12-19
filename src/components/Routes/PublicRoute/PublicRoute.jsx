import React from 'react';
import { Route } from 'react-router';

const PublicRoute = ({ children, ...props }) => <Route {...props}>{children}</Route>;

export default PublicRoute;
