import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router';
import NotFoundProviderSwitch from './components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import { SplashScreen } from './components/UI/SplashScreen/SplashScreen';
import Support from './Pages/Support/Support';
import UserPanel from './Pages/userPanel/userPanel';
import WelcomeScreen from './Pages/WelcomeScreen/WelcomeScreen';
import { authCheckState } from './authorization/store/auth';
import { StoreDispatch, StoreState } from './stores/store';
import { fetchUserSettings } from './stores/user/user';
import { Logout } from './authorization/logout/logout';

const App = () => {
    const authStore = useSelector((state: StoreState) => state.auth);
    const userStore = useSelector((state: StoreState) => state.user);
    const dispatch: StoreDispatch = useDispatch();

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
                <Support />
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
