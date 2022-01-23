import { configureStore } from '@reduxjs/toolkit';
import { mocked } from 'jest-mock';
import axios from '../../libs/axios';
import { fetchUserSettings, updateUserSettings } from './user';
import userSlice from './userSlice';

jest.mock('../../libs/axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

const defaultStore = configureStore({ reducer: userSlice });

const httpClient = mocked(axios, true);

describe('stores - user', () => {
    let store: typeof defaultStore;
    let dispatch: typeof defaultStore.dispatch;
    let getState: typeof defaultStore.getState;

    beforeEach(() => {
        store = defaultStore;
        getState = store.getState;
        dispatch = store.dispatch;
    });

    it('should set user settings after a successful fetch', async () => {
        givenUserSettingsResponse();

        expect(getState().settings).toEqual(null);

        await dispatch(fetchUserSettings());

        expect(getState().settings).toEqual({ startingPage: '/basics' });
    });

    it('should set loading state when request is pending', () => {
        givenUserSettingsResponse();

        dispatch(fetchUserSettings());

        expect(getState().fetchUserRequestStatus.loading).toEqual(true);
    });

    it('should set an error state when request fails', async () => {
        givenUserSettingsEndpointThrows();

        await dispatch(fetchUserSettings());

        expect(getState().fetchUserRequestStatus.error).toEqual('error');
    });

    it('should update user settings and monitor the requests state', async () => {
        givenUpdateRequestSuccessful();

        dispatch(updateUserSettings({ startingPage: 'some-path' }));

        expect(getState().settingsUpdateRequest.loading).toEqual(true);
    });

    it('should set an error state when update request fails', async () => {
        givenUpdateRequestThrows();

        await dispatch(updateUserSettings({ startingPage: 'some-path' }));

        expect(getState().settingsUpdateRequest.error).toEqual('error');
    });

    function givenUserSettingsResponse() {
        httpClient.get.mockResolvedValue({
            data: {
                settings: {
                    startingPage: '/basics',
                },
            },
        });
    }

    function givenUserSettingsEndpointThrows() {
        httpClient.get.mockRejectedValue(new Error('error'));
    }

    function givenUpdateRequestThrows() {
        httpClient.post.mockRejectedValue(new Error('error'));
    }

    function givenUpdateRequestSuccessful() {
        httpClient.post.mockResolvedValue({ success: true });
    }
});
