import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../stores/auth/authSlice';
import solutionsReducer from '../stores/solutions/solutionsSlice';
import supportRequestsReducer from '../stores/supportRequests/supportRequestsSlice';
import userReducer from '../stores/user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        solutions: solutionsReducer,
        supportRequests: supportRequestsReducer,
    },
});
