import * as actionTypes from './actionsTypes';
import axios from '../../libs/axios';
import urls from '../../shared/urls';

const userFetchStart = () => {
    return { type: actionTypes.USER_FETCH_START };
};

const userFetchSuccess = (settings) => {
    return {
        type: actionTypes.USER_FETCH_SUCCESS,
        payload: { settings },
    };
};

const userFetchFail = (error) => {
    return {
        type: actionTypes.USER_FETCH_FAIL,
        payload: { error },
    };
};

export const fetchUserSettings = () => {
    return async (dispatch) => {
        dispatch(userFetchStart());
        try {
            const response = await axios.get(urls.settings);

            dispatch(userFetchSuccess(response.data.settings));
        } catch (error) {
            dispatch(userFetchFail(error));
        }
    };
};
