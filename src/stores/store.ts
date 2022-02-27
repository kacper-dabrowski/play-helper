import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authorization/store/authSlice';
import solutionsReducer from '../userPanel/solutions/store/solutionsSlice';
import supportRequestsReducer from '../userPanel/supportRequests/store/supportRequestsSlice';
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
