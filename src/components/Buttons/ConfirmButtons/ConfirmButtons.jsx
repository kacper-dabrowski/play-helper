import { HStack } from '@chakra-ui/react';
import React from 'react';
import ClearButton from './ClearButton/ClearButton';
import ConfirmButton from './ConfirmButton/ConfirmButton';

const ConfirmButtons = ({ onGenerateTemplate, onClearFields, confirmTitle }) => (
    <HStack display={'flex'} justify={'center'} align="center">
        <ConfirmButton type="submit" onClick={onGenerateTemplate} title={confirmTitle} />
        <ClearButton onClick={onClearFields} />
    </HStack>
);
export default ConfirmButtons;
