import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import solutionsReducer from './solutions/solutionsSlice';
import supportRequestsReducer from './supportRequests/supportRequestsSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        solutions: solutionsReducer,
        supportRequests: supportRequestsReducer,
    },
});

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
