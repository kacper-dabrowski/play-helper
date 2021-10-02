import cogoToast from 'cogo-toast';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { actions } from '../../stores/auth/authSlice';

const Logout = () => {
    const logoutTimeoutId = useSelector((state) => state.auth.logoutTimeoutId);
    const dispatch = useDispatch();

    useEffect(() => {
        clearTimeout(logoutTimeoutId);
        dispatch(actions.logout());
        cogoToast.info('Zostałeś wylogowany');
    });

    return <Redirect to="/" />;
};

export default Logout;
