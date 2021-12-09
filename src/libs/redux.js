import { configureStore } from '@reduxjs/toolkit';
import supportRequestsReducer from '../stores/supportRequests/slice';
import authReducer from '../stores/auth/authSlice';
import userReducer from '../stores/user/userSlice';
import solutionsReducer from '../stores/solutions/slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        supportRequests: supportRequestsReducer,
        solutions: solutionsReducer,
    },
});
