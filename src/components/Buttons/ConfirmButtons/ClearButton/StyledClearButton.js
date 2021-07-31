import styled from 'styled-components';
import { BaseButton } from '../../BaseButton/StyledBaseButton';
import { colors } from '../../../../shared/colors';

export const StyledClearButton = styled(BaseButton)`
    width: 10rem;
    margin: 0 1rem;
    background-color: ${colors.forbidden};
    color: white;

    &:hover,
    &:active,
    &:focus {
        background-color: ${colors.forbiddenHover};
    }
`;
