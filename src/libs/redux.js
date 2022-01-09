import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../stores/auth/authSlice';
import userReducer from '../stores/user/userSlice';
import solutionsReducer from '../stores/solutions/solutionsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        solutions: solutionsReducer,
    },
});
