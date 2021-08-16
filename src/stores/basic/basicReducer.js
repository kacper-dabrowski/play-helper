import basicActions from './actionTypes';

const initialState = {
    sex: '',
    type: '',
    channel: '',
    date: '',
    general: '',
    details: '',
    hasOffer: false,
};

const setStoreValues = (state, action) => ({ ...action.payload });

const clearStoreValues = () => ({ ...initialState });

export const basicReducer = (state = initialState, action) => {
    switch (action.type) {
        case basicActions.SET_FIELDS_VALUES:
            return setStoreValues(state, action);
        case basicActions.CLEAR_FIELDS_VALUES:
            return clearStoreValues();
        default:
            return state;
    }
};
