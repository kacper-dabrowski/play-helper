import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        spacing: {
            small: string;
            medium: string;
            large: string;
        };
        fontSize: {
            small: string;
            medium: string;
            large: string;
        };
        fontColor: {
            primary: string;
            secondary: string;
            highlight: string;
        };
    }
}
