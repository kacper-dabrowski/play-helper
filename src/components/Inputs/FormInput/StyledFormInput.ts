import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface StyledInputProps {
    hasErrors?: boolean;
}

export const StyledFormInput = styled(Input)<StyledInputProps>`
    margin: 0.5rem auto;
`;
