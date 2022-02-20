import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { toastProvider } from '../../libs/toast';
import { logout } from '../store/auth';
import { StoreState } from '../../stores/store';

export const Logout = () => {
    const logoutTimeoutId = useSelector((state: StoreState) => state.auth.logoutTimeoutId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (logoutTimeoutId) {
            clearTimeout(logoutTimeoutId);
        }

        dispatch(logout());

        toastProvider.info('Zostałeś wylogowany');
    });

    return <Redirect to="/" />;
};
