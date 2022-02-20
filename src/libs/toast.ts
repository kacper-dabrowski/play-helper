import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { RequestStatus } from '../shared/requestStatus/requestStatus';

interface ToastProvider {
    success: (message: string) => void;
    error: (message: string) => void;
    loading: (message: string) => void;
    info: (message: string) => void;
}

export const toastProvider: ToastProvider = {
    success: (message) => {
        toast.success(message);
    },
    error: (message) => {
        toast.error(message);
    },
    loading: (message) => {
        toast.loading(message);
    },
    info: (message) => {
        toast(message, { icon: '🚪' });
    },
};
