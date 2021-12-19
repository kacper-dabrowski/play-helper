import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route } from 'react-router';
import Logout from './components/Logout/Logout';
import NotFoundProviderSwitch from './components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import { SplashScreen } from './components/UI/SplashScreen/SplashScreen';
import PlayNext from './Pages/PlayNext/PlayNext';
import Support from './Pages/Support/Support';
import UserPanel from './Pages/UserPanel/UserPanel';
import WelcomeScreen from './Pages/WelcomeScreen/WelcomeScreen';
import { useStore } from './stores/stores';

const App = observer(() => {
    const { userStore } = useStore();

    if (userStore.fetchUserRequest.loading) {
        return <SplashScreen />;
    }

    return (
        <NotFoundProviderSwitch>
            <PrivateRoute path="/support">
                <Support />
            </PrivateRoute>
            <PrivateRoute path="/next">
                <PlayNext />
            </PrivateRoute>
            <PrivateRoute path="/user-panel">
                <UserPanel />
            </PrivateRoute>
            <PrivateRoute path="/logout">
                <Logout />
            </PrivateRoute>
            <Route path="/" exact>
                <WelcomeScreen />
            </Route>
        </NotFoundProviderSwitch>
    );
});

export default App;
