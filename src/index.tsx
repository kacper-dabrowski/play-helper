import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { store } from './stores/store';
import { theme } from './shared/theme/theme';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <ChakraProvider>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                    <Toaster />
                </BrowserRouter>
            </ChakraProvider>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();
