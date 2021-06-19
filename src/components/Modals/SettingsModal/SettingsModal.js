import React from 'react';
import Modal from '../../UI/Modal/Modal';
import SettingsForm from '../../Forms/SettingsForm/SettingsForm';

const SettingsModal = ({ isOpened, closeModalHandler }) => {
    return (
        <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
            <SettingsForm />
        </Modal>
    );
};

export default SettingsModal;
