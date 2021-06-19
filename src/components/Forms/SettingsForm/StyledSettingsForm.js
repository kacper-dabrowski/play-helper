import styled from 'styled-components';

export const StyledFormHeader = styled.h2``;

export const StyledSettingsForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledSettingsFormLabel = styled.label`
    color: white;
    padding: 0.5rem;
`;

export const StyledSettingsParagraph = styled.p`
    color: white;
    & span {
        color: pink;
    }
`;
