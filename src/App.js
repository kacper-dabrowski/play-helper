import React, { useEffect } from 'react';
import { Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Logout from './components/Logout/Logout';
import NotFoundProviderSwitch from './components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import PlayNext from './Pages/PlayNext/PlayNext';
import Support from './Pages/Support/Support';
import UserPanel from './Pages/UserPanel/UserPanel';
import WelcomeScreen from './Pages/WelcomeScreen/WelcomeScreen';
import routes from './shared/routes';
import { SplashScreen } from './components/UI/SplashScreen/SplashScreen';
import { fetchUserSettings } from './stores/user/user';
import { authCheckState } from './stores/auth/auth';

const App = () => {
    const authStore = useSelector((state) => state.auth);
    const userStore = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheckState());
        dispatch(fetchUserSettings());
    }, [dispatch, authStore.user.token]);

    if (userStore.fetchUserRequestStatus.loading) {
        return <SplashScreen />;
    }
    return (
        <NotFoundProviderSwitch>
            <PrivateRoute path="/support">
                <Support routes={routes.support} />
            </PrivateRoute>
            <PrivateRoute path="/next">
                <PlayNext />
            </PrivateRoute>
            <PrivateRoute path="/user-panel">
                <UserPanel />
            </PrivateRoute>
            <PrivateRoute path="/logout" component={Logout} />
            <Route path="/" exact>
                <WelcomeScreen />
            </Route>
        </NotFoundProviderSwitch>
    );
};

export default App;
