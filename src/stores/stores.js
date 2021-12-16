import { createContext, useContext } from 'react';
import { createAuthStore } from './auth/store';
import { createSupportRequestsStore } from './supportRequests/store';
import { createUserStore } from './user/store';

export const initializeStores = () => ({
    authStore: createAuthStore(),
    userStore: createUserStore(),
    supportRequestsStore: createSupportRequestsStore(),
});

export const StoreContext = createContext(initializeStores());

export const useStore = () => {
    const stores = useContext(StoreContext);

    return stores;
};
