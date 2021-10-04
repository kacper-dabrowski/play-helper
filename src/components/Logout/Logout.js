import cogoToast from 'cogo-toast';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { logout } from '../../stores/auth/auth';

const Logout = () => {
    const logoutTimeoutId = useSelector((state) => state.auth.logoutTimeoutId);
    const dispatch = useDispatch();

    useEffect(() => {
        clearTimeout(logoutTimeoutId);
        dispatch(logout());
        cogoToast.info('Zostałeś wylogowany');
    });

    return <Redirect to="/" />;
};

export default Logout;
