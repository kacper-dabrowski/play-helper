import styled from 'styled-components';

export const StyledSupportLayout = styled.div`
    width: 100%;
    height: 100vh;
    background: #303030 url(${(props) => props.backgroundImage});
    background-size: cover;
    color: white;
    overflow: hidden;
    z-index: 100;
`;

export const Container = styled.div`
    width: 80%;
    height: calc(100% - 120px);
    display: grid;
    text-align: center;
    margin: auto;
    grid-template-columns: 1fr 1fr;
`;
