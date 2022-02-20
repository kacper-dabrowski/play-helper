import { configureStore } from '@reduxjs/toolkit';
import { mocked } from 'jest-mock';
import axios from '../../libs/axios';
import { createRequestStatus } from '../../shared/requestStatus/requestStatus';
import { authCheckState, loginUser, logout, registerUser } from './auth';
import authSlice, { actions } from './authSlice';

const defaultStore = configureStore({ reducer: authSlice });

jest.mock('../../libs/axios');

describe('stores - authSlice', () => {
    const httpClient = mocked(axios, true);
    let getState: typeof defaultStore.getState;
    let dispatch: typeof defaultStore.dispatch;

    beforeEach(() => {
        const store = configureStore({ reducer: authSlice });

        jest.resetAllMocks();
        getState = store.getState;
        dispatch = store.dispatch;
    });

    describe('login', () => {
        const username = 'testUser';
        const password = 'testPassword';

        it('should update request to loading state when logging in', () => {
            dispatch(loginUser({ username, password }));

            expect(getState().loginRequest.loading).toEqual(true);
        });

        it('should indicate a request error if it finished with error', async () => {
            givenRequestFails();

            await dispatch(loginUser({ username, password }));

            expect(getState().loginRequest.loading).toEqual(false);
            expect(getState().loginRequest.error).toEqual('Something went wrong');
        });

        it('should set user data when login ends with success', async () => {
            givenLoginSucceeds();

            await dispatch(loginUser({ username, password }));

            expect(getState().user).toEqual({
                token: '1234',
                userId: '123456',
                fullName: 'Test User',
            });
        });
    });

    describe('register', () => {
        const credentials = {
            username: 'testUser',
            password: 'testPassword',
            confirmPassword: 'testPassword',
            fullName: 'Test User',
        };

        it('should indicate loading state when registration is pending', () => {
            dispatch(registerUser(credentials));

            expect(getState().registrationRequest.loading).toEqual(true);
        });

        it('should pass an error message when request fails', async () => {
            givenRequestFails();

            await dispatch(registerUser(credentials));

            expect(getState().registrationRequest.error).toEqual('Something went wrong');
        });

        it('should login user on successful registration', async () => {
            givenLoginSucceeds();

            await dispatch(registerUser(credentials));

            expect(getState().user).toEqual({ token: '1234', userId: '123456', fullName: 'Test User' });
        });
    });

    describe('logout', () => {
        const username = 'testUser';
        const password = 'testPassword';

        it('should clear user data and reset all requests on logout', async () => {
            givenLoginSucceeds();

            await dispatch(loginUser({ username, password }));

            expect(localStorage.getItem('token')).not.toEqual(null);

            await dispatch(logout());

            expect(getState()).toEqual({
                user: {
                    token: '',
                    userId: '',
                    fullName: '',
                },
                loginRequest: createRequestStatus(),
                registrationRequest: createRequestStatus(),
                logoutTimeoutId: null,
            });
            expect(localStorage.getItem('token')).toEqual(null);
        });
    });

    describe('userAlreadyLoggedIn', () => {
        it('should read data from localStorage and log user in', () => {
            dispatch(actions.userAlreadyLoggedIn({ token: '1234', userId: '1234', fullName: 'Test user' }));

            expect(getState().user).toEqual({ token: '1234', userId: '1234', fullName: 'Test user' });
        });
    });

    describe('Expiring session', () => {
        beforeAll(() => {
            jest.useFakeTimers('modern').setSystemTime(new Date(1643461863499).getTime());
        });

        afterAll(() => {
            jest.useFakeTimers('modern').setSystemTime(new Date(1643461863499).getTime());
        });

        it('should append userdata to store if session is valid', async () => {
            givenUserAlreadyLoggedIn();

            await dispatch(authCheckState());

            expect(getState().user).toEqual({ fullName: 'Test User', token: '1234', userId: '1234' });
        });

        it('should log user out if session is old', async () => {
            const initialState = getState();

            givenOldSession();

            await dispatch(authCheckState());

            expect(getState().user).toEqual(initialState.user);
            expect(localStorage.getItem('token')).toEqual(null);
        });

        it('should log user automatically, when session expires', async () => {
            const initialState = getState();

            givenUserAlreadyLoggedIn();

            await dispatch(authCheckState());

            jest.runAllTimers();

            expect(getState().user).toEqual(initialState.user);
        });
    });

    function givenLoginSucceeds() {
        httpClient.post.mockResolvedValue({
            data: {
                token: '1234',
                userId: '123456',
                fullName: 'Test User',
                expiresIn: 123,
            },
        });
    }

    function givenRequestFails() {
        httpClient.post.mockRejectedValue(new Error('Something went wrong'));
    }

    function givenUserAlreadyLoggedIn() {
        localStorage.setItem('token', '1234');
        localStorage.setItem('expirationDate', new Date(1643461863499 + 30000).toString());
        localStorage.setItem('fullName', 'Test User');
        localStorage.setItem('userId', '1234');
    }

    function givenOldSession() {
        localStorage.setItem('token', '1234');
        localStorage.setItem('expirationDate', new Date(1643461863499 - 30000).toString());
        localStorage.setItem('fullName', 'Test User');
        localStorage.setItem('userId', '1234');
    }
});
