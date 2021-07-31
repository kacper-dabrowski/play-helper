import cogoToast from 'cogo-toast';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import routes from '../../../shared/routes';
import urls from '../../../shared/urls';
import { OptionSelect } from '../../Inputs/OptionSelect/OptionSelect';
import { FormLabel } from './StyledSettingsForm';
import { updateUserSettings } from '../../../stores/user/user';
import { StyledBaseForm, StyledFormHeader } from '../BaseForm/BaseForm';

const SettingsForm = () => {
    const userSettings = useSelector((state) => state.user?.settings?.startingPage);

    const dispatch = useDispatch();
    const [startingPage, setStartingPage] = useState(userSettings);
    const { requestHandler, error } = useRequest(urls.settings, REQUEST_METHODS.POST);

    const onStartingPageChange = useCallback(
        async (event) => {
            const chosenStartingPage = event.target.value;

            setStartingPage(chosenStartingPage);

            await requestHandler({ settings: { startingPage } }, () => urls.settings);

            await dispatch(updateUserSettings({ startingPage: chosenStartingPage }));

            if (error) {
                return cogoToast.error(error?.data?.message || error.message);
            }

            cogoToast.success('Pomyślnie zapisano ustawienie');
        },
        [error, dispatch, requestHandler, startingPage]
    );

    return (
        <StyledBaseForm>
            <StyledFormHeader>Ustawienia użytkownika</StyledFormHeader>
            <FormLabel htmlFor="startingPage">Strona startowa</FormLabel>
            <OptionSelect
                selectProps={{ name: 'startingPage', defaultValue: startingPage, onChange: onStartingPageChange }}
            >
                <option value={routes.support.basic.path}>Zamknięcie zwykłe</option>
                <option value={routes.support.doubleOpened.path}>Dubel otwarty</option>
                <option value={routes.support.doubleClosed.path}>Dubel zamknięty</option>
                <option value={routes.support.payments.path}>Raty</option>
                <option value={routes.support.srq.path}>SRQ</option>
            </OptionSelect>
        </StyledBaseForm>
    );
};

export default SettingsForm;
