import React from 'react';
import { useStore } from '../../../stores/stores';
import Basic from './Basic';

export const BasicContainer = () => {
    const { authStore } = useStore();

    return <Basic name={authStore.user.fullName} />;
};
