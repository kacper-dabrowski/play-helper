import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import arrowBackImage from '../../../assets/icons/left-arrow-back.svg';

export const StyledArrowBack = styled(Link)`
    top: 0;
    left: ${({ theme }) => theme.spacing.medium};
    margin: ${({ theme }) => theme.spacing.medium};
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('${arrowBackImage}');
    background-size: cover;
    transition: ease-in-out 0.2s;
    &:hover,
    &:active,
    &:focus {
        transform: scale(1.1);
    }
`;
