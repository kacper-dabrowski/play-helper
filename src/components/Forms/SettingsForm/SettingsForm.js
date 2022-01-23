import React, { useCallback, useState } from 'react';
import { useErrorNotification } from '../../../hooks/useErrorNotification';
import { toastProvider } from '../../../libs/toast';
import routes from '../../../shared/routes';
import { OptionSelect } from '../../Inputs/OptionSelect/OptionSelect';
import { StyledBaseForm, StyledFormHeader } from '../BaseForm/BaseForm';
import { FormLabel } from './StyledSettingsForm';

const SettingsForm = ({ userSettings, onSettingsUpdate, settingsUpdateRequest }) => {
    const [startingPage, setStartingPage] = useState(userSettings.startingPage);

    const onStartingPageChange = useCallback(
        async (event) => {
            const chosenStartingPage = event.target.value;

            setStartingPage(chosenStartingPage);

            await onSettingsUpdate({ settings: { startingPage: chosenStartingPage } });

            toastProvider.success('Pomyślnie zapisano ustawienie');
        },
        [onSettingsUpdate]
    );

    useErrorNotification(settingsUpdateRequest);

    return (
        <StyledBaseForm>
            <StyledFormHeader>Ustawienia użytkownika</StyledFormHeader>
            <FormLabel htmlFor="startingPage">Strona startowa</FormLabel>
            <OptionSelect
                selectProps={{
                    name: 'startingPage',
                    defaultValue: startingPage,
                    onChange: onStartingPageChange,
                    'data-testid': 'settings-select',
                }}
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
