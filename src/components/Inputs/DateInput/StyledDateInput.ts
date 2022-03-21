import styled from '@emotion/styled';
import { colors } from '../../../shared/colors';

export const StyledDateInput = styled.input`
    width: 9rem;
    max-height: 40px;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font: inherit;
    font-size: 0.9rem;
    padding: 0.5rem;
    border-radius: 20px;
    background-color: ${colors.backgroundGrey};
    border: none;

    &:invalid {
        color: transparent;
        background-color: ${colors.forbidden};
    }
`;
