import React from 'react';
import { observer } from 'mobx-react-lite';
import Modal from '../../UI/Modal/Modal';
import SettingsForm from '../../Forms/SettingsForm/SettingsForm';

const SettingsModal = observer(
    ({ isOpened, closeModalHandler, onSettingsUpdate, userSettings, settingsUpdateRequest }) => {
        return (
            <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
                <SettingsForm
                    onSettingsUpdate={onSettingsUpdate}
                    userSettings={userSettings}
                    settingsUpdateRequest={settingsUpdateRequest}
                />
            </Modal>
        );
    }
);

export default SettingsModal;
