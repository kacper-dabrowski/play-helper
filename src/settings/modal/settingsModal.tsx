import React, { FC } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { RequestStatus } from '../../shared/requestStatus/requestStatus';
import { UserSettingsModel } from '../../stores/user/dto';
import SettingsForm from '../settingsForm';

interface SettingsModalProps {
    isOpened: boolean;
    closeModalHandler: () => void;
    onSettingsUpdate: (payload: { settings: UserSettingsModel }) => Promise<void>;
    userSettings: UserSettingsModel;
    settingsUpdateRequest: RequestStatus;
}

const SettingsModal: FC<SettingsModalProps> = ({
    isOpened,
    closeModalHandler,
    onSettingsUpdate,
    userSettings,
    settingsUpdateRequest,
}) => {
    return (
        <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
            <SettingsForm
                onSettingsUpdate={onSettingsUpdate}
                userSettings={userSettings}
                settingsUpdateRequest={settingsUpdateRequest}
            />
        </Modal>
    );
};

export default SettingsModal;
