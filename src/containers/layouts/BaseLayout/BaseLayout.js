import styled from 'styled-components';

export const BaseLayout = styled.div`
    width: 100%;
    height: 100vh;
    background: #303030 url(${(props) => props.backgroundImage});
    background-size: cover;
    color: white;
    overflow: hidden;
    z-index: 100;
`;
