import React from 'react';
import { useSelector } from 'react-redux';
import Basic from './Basic';

export const BasicContainer = () => {
    const authStore = useSelector((state) => state.auth);

    return <Basic name={authStore.user.fullName} />;
};
