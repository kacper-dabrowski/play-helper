import cogoToast from 'cogo-toast';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import routes from '../../../shared/routes';
import urls from '../../../shared/urls';
import * as actions from '../../../store/actions';
import { OptionSelect } from '../../Inputs/OptionSelect/OptionSelect';
import { StyledFormHeader } from '../../UI/Headers/StyledHeaders';
import { StyledSettingsForm, StyledSettingsFormLabel } from './StyledSettingsForm';

const SettingsForm = (props) => {
    const [startingPage, setStartingPage] = useState(props?.userSettings?.startingPage);
    const { requestHandler, error, isLoading } = useRequest(urls.settings, REQUEST_METHODS.POST);

    const onStartingPageChange = useCallback(
        async (event) => {
            setStartingPage(event.target.value);
            await requestHandler({ settings: { startingPage } }, () => urls.settings);
            await props.updateUserSettings({ startingPage: event.target.value });

            if (isLoading) {
                cogoToast.loading('Zapisuję...');
            }

            if (props?.updateRequestError?.message) {
                return cogoToast.error(props.updateRequestError.message);
            }

            if (error) {
                return cogoToast.error(error?.data?.message || error.message);
            }

            cogoToast.success('Pomyślnie zapisano ustawienie');
        },
        [error, props, requestHandler, startingPage, isLoading]
    );

    return (
        <StyledSettingsForm>
            <StyledFormHeader>Ustawienia użytkownika</StyledFormHeader>
            <StyledSettingsFormLabel htmlFor="startingPage">Strona startowa</StyledSettingsFormLabel>
            <OptionSelect
                selectProps={{ name: 'startingPage', defaultValue: startingPage, onChange: onStartingPageChange }}
            >
                <option value={routes.support.basic.path}>Zamknięcie zwykłe</option>
                <option value={routes.support.doubleOpened.path}>Dubel otwarty</option>
                <option value={routes.support.doubleClosed.path}>Dubel zamknięty</option>
                <option value={routes.support.payments.path}>Raty</option>
                <option value={routes.support.srq.path}>SRQ</option>
            </OptionSelect>
        </StyledSettingsForm>
    );
};
const mapStateToProps = (state) => ({
    userSettings: state.user.settings,
    updateRequestError: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
    updateUserSettings: (settings) => dispatch(actions.updateUserSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
