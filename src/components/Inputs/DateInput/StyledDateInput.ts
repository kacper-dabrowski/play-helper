import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { colors } from '../../../shared/colors';

export const StyledDateInput = styled(Input)`
    width: 9rem;
    margin: 0.5rem;

    &:invalid {
        color: transparent;
        background-color: ${colors.forbidden};
    }
`;
