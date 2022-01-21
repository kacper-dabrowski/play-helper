import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import axios from '../../libs/axios';
import { fetchUserSettings, updateUserSettings } from './user';

jest.mock('../../libs/axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

describe('stores - user', () => {
    let store;
    let dispatch;
    let getState;

    beforeEach(() => {
        store = configureStore({ reducer: userSlice });
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

        dispatch(updateUserSettings());

        expect(getState().settingsUpdateRequest.loading).toEqual(true);
    });

    it('should set an error state when update request fails', async () => {
        givenUpdateRequestThrows();

        await dispatch(updateUserSettings({ startingPage: true }));

        expect(getState().settingsUpdateRequest.error).toEqual('error');
    });

    function givenUserSettingsResponse() {
        axios.get.mockResolvedValue({
            data: {
                settings: {
                    startingPage: '/basics',
                },
            },
        });
    }

    function givenUserSettingsEndpointThrows() {
        axios.get.mockRejectedValue(new Error('error'));
    }

    function givenUpdateRequestThrows() {
        axios.post.mockRejectedValue(new Error('error'));
    }

    function givenUpdateRequestSuccessful() {
        axios.post.mockResolvedValue({ success: true });
    }
});
