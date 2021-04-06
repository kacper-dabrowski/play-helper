import { Link } from 'react-router-dom';
import styled from 'styled-components';
import arrowBackImage from '../../../assets/icons/left-arrow-back.svg';

export const StyledArrowBack = styled(Link)`
    top: 0;
    left: 1rem;
    margin: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('${arrowBackImage}');
    background-size: cover;
    transition: ease-in-out 0.2s;
    &:hover {
        transform: scale(1.1);
    }
`;
