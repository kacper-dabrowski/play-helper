import React from 'react';
import { StyledNotFoundLink, StyledNotFoundPage } from './StyledNotFoundPage';
import notFoundImage from '../../../assets/icons/not-found.svg';

const NotFoundPage = () => (
    <StyledNotFoundPage>
        <img src={notFoundImage} alt={404} />
        <p>
            Nie tędy droga! <StyledNotFoundLink to="/">Zawróć na stronę startową!</StyledNotFoundLink>
        </p>
    </StyledNotFoundPage>
);

export default NotFoundPage;
