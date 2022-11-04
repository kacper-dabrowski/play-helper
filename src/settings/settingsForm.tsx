import React, { FC, useCallback, useState } from 'react';
import { StyledBaseForm, StyledFormHeader } from '../components/Forms/BaseForm/BaseForm';
import { useErrorNotification, useSuccessNotification } from '../hooks/useNotification';
import { RequestStatus } from '../shared/requestStatus/requestStatus';
import routes from '../shared/routes';
import { UserSettingsModel } from '../stores/user/dto';
import { FormLabel } from './styledSettingsForm';

interface SettingsFormProps {
    userSettings: UserSettingsModel;
    onSettingsUpdate: (payload: { settings: UserSettingsModel }) => Promise<void>;
    settingsUpdateRequest: RequestStatus;
}

const SettingsForm: FC<SettingsFormProps> = ({ userSettings, onSettingsUpdate, settingsUpdateRequest }) => {
    const [startingPage, setStartingPage] = useState(userSettings.startingPage);

    const onStartingPageChange = useCallback(
        async (event) => {
            const chosenStartingPage = event.target.value;

            setStartingPage(chosenStartingPage);

            await onSettingsUpdate({ settings: { startingPage: chosenStartingPage } });
        },
        [onSettingsUpdate]
    );

    useErrorNotification(settingsUpdateRequest);
    useSuccessNotification(settingsUpdateRequest, 'Pomyślnie zapisano ustawienie');

    return (
        <StyledBaseForm>
            <StyledFormHeader>Ustawienia użytkownika</StyledFormHeader>
            <FormLabel htmlFor="startingPage">Strona startowa</FormLabel>
            <option defaultValue={startingPage || ''} onChange={onStartingPageChange} data-testid="settings-select">
                <option value={routes.support.basic.path}>Zamknięcie zwykłe</option>
                <option value={routes.support.doubleOpened.path}>Dubel otwarty</option>
                <option value={routes.support.doubleClosed.path}>Dubel zamknięty</option>
                <option value={routes.support.payments.path}>Raty</option>
                <option value={routes.support.srq.path}>SRQ</option>
            </option>
        </StyledBaseForm>
    );
};

export default SettingsForm;
