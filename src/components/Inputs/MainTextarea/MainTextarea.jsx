import { Button, Center } from '@chakra-ui/react';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toastProvider } from '../../../libs/toast';
import { StyledMainTextarea } from './StyledMainTextarea';

export const MainTextarea = ({ setTemplate, value, ...props }) => {
    return (
        <Center display={'flex'} flexDir={'column'}>
            <StyledMainTextarea
                rows="25"
                resize={'vertical'}
                width={'60%'}
                {...props}
                value={value}
                onChange={(event) => setTemplate(event.target.value)}
            />
            <CopyToClipboard text={value} onCopy={() => toastProvider.success('Pomyślnie skopiowano formatkę')}>
                <Button colorScheme={'green'} width={150} my={5}>
                    Kopiuj
                </Button>
            </CopyToClipboard>
        </Center>
    );
};
