import cogoToast from 'cogo-toast';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useStore } from '../../stores/stores';

const Logout = () => {
    const { authStore } = useStore();

    useEffect(() => {
        clearTimeout(authStore.logoutTimeoutId);
        authStore.logout();
        cogoToast.info('Zostałeś wylogowany');
    });

    return <Redirect to="/" />;
};

export default Logout;
