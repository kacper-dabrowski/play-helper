import styled from 'styled-components';
import { BaseButton } from '../BaseButton/StyledBaseButton';

export const StyledAdditionalTemplate = styled(BaseButton)`
    background-color: ${({ enabled }) => (enabled ? '#399547' : '#fa7f72')};
    margin: 1rem auto;
    color: white;
    text-align: center;
    max-width: 100%;
    width: 15rem;

    &:hover {
        background-color: ${({ enabled }) => (enabled ? '#1c4a23' : '#bb2205')};
        cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
    }
`;
