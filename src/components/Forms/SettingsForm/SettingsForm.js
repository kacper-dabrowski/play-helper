import React, { useState } from 'react';
import { connect } from 'react-redux';
import cogoToast from 'cogo-toast';
import routes from '../../../shared/routes';
import { StyledFormHeader } from '../../UI/Headers/StyledHeaders';
import { StyledSettingsForm, StyledSettingsFormLabel } from './StyledSettingsForm';
import axios from '../../../libs/axios';
import urls from '../../../shared/urls';
import * as actions from '../../../store/actions';
import { OptionSelect } from '../../Inputs/OptionSelect/OptionSelect';

const SettingsForm = (props) => {
    const [startingPage, setStartingPage] = useState(props.userSettings.startingPage);

    const onStartingPageChange = async (event) => {
        try {
            await axios.post(urls.settings, { settings: { startingPage: event.target.value } });
            setStartingPage(event.target.value);
            await props.updateUserSettings({ startingPage: event.target.value });
            cogoToast.success('Pomyślnie zapisano ustawienie');
        } catch (error) {
            cogoToast.error(error?.data?.message || error.message);
        }
    };

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
});

const mapDispatchToProps = (dispatch) => ({
    updateUserSettings: (settings) => dispatch(actions.updateUserSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
