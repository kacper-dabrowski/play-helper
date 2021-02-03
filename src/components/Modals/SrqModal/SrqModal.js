import React, { useCallback, useState } from 'react';
import { StyledFormHeader } from '../../UI/Headers/StyledHeaders';
import Modal from '../../UI/Modal/Modal';
import ErrorMessage from '../Messages/ErrorMessage/ErrorMessage';
import SuccessMessage from '../Messages/SuccessMessage/SuccessMessage';
import SrqForm from './SrqForm/SrqForm';
import { SrqModalContainer } from './StyledSrqModal';

const SrqModal = ({ isOpened, closeModalHandler }) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const toggleSuccess = useCallback(() => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 5000);
    }, []);
    return (
        <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
            <SrqModalContainer>
                <StyledFormHeader>Utwórz SRQ</StyledFormHeader>
                {success ? <SuccessMessage message="Operacja zakończona powodzeniem" /> : null}
                {error ? <ErrorMessage message={error} /> : null}
                <SrqForm setError={setError} setSuccess={toggleSuccess} />
            </SrqModalContainer>
        </Modal>
    );
};

export default SrqModal;
