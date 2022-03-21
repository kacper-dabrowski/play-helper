import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
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
            black: string;
        };
    }
}
