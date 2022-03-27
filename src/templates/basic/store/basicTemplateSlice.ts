import { createAction, createSlice } from '@reduxjs/toolkit';
import { CustomerGender, CustomerType, NotificationChannel } from '../../../shared/identifiers';
import { Maybe } from '../../../shared/types/types';

export const setGenderAction = createAction<CustomerGender>('setGender');
export const setTypeAction = createAction<CustomerType>('setType');
export const setChannelAction = createAction<CustomerType>('setChannel');
export const setDate = createAction<string>('setDate');
export const setNotificationDescription = createAction<string>('setNotificationDescription');
export const setNotificationDetails = createAction<string>('setNotificationDetails');
export const setHasOffer = createAction<boolean>('setHasOffer');
export const setTemplate = createAction<string>('setTemplate');

export interface BasicTemplateState {
    gender: Maybe<CustomerGender>;
    type: Maybe<CustomerType>;
    channel: Maybe<NotificationChannel>;
    date: Maybe<string>;
    notificationDescription: Maybe<string>;
    notificationDetails: Maybe<string>;
    hasOffer: Maybe<boolean>;
    template: Maybe<string>;
}

const initialState: BasicTemplateState = {
    gender: null,
    type: null,
    channel: null,
    date: null,
    notificationDescription: null,
    notificationDetails: null,
    hasOffer: null,
    template: null,
};

const basicTemplateSlice = createSlice({
    name: 'basicTemplate',
    initialState: { ...initialState },
    reducers: {
        clearState: (state) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            state = initialState;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(setGenderAction, (state, action) => {
                state.gender = action.payload;
            })
            .addCase(setTypeAction, (state, action) => {
                state.type = action.payload;
            })
            .addCase(setDate, (state, action) => {
                state.date = action.payload;
            })
            .addCase(setNotificationDescription, (state, action) => {
                state.notificationDescription = action.payload;
            })
            .addCase(setNotificationDetails, (state, action) => {
                state.notificationDetails = action.payload;
            })
            .addCase(setHasOffer, (state, action) => {
                state.hasOffer = action.payload;
            }),
});

export default basicTemplateSlice.reducer;
