import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../stores/auth/authSlice';
import userReducer from '../stores/user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});
