import { Center, VStack } from '@chakra-ui/react';
import { FC } from 'react';

export const Card: FC = ({ children }) => {
    return (
        <Center py={10} width={'100%'}>
            <VStack borderWidth="1px" borderRadius="lg" bg={'transparent'} boxShadow={'2xl'} padding={10} marginX={15}>
                {children}
            </VStack>
        </Center>
    );
};
