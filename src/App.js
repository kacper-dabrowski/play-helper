import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Logout from './components/Logout/Logout';
import NotFoundProviderSwitch from './components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import PlayNext from './Pages/PlayNext/PlayNext';
import Support from './Pages/Support/Support';
import UserPanel from './Pages/UserPanel/UserPanel';
import WelcomeScreen from './Pages/WelcomeScreen/WelcomeScreen';
import routes from './shared/routes';
import * as actions from './store/actions';
import { SplashScreen } from './components/UI/SplashScreen/SplashScreen';

const App = (props) => {
    useEffect(() => {
        props.onTryAutoSignup();
        props.fetchUserSettings();
    }, [props.isAuthenticated]);

    if (props.areSettingsLoading) {
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

const mapDispatchToProps = (dispatch) => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    fetchUserSettings: () => dispatch(actions.fetchUserSettings()),
});

const mapStateToProps = (state) => ({
    isAuthenticated: Boolean(state.auth.token),
    areSettingsLoading: state.user.loading,
    userSettings: state.user.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
