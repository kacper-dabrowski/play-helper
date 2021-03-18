import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Logout from './components/Logout/Logout';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import PlayNext from './Pages/PlayNext/PlayNext';
import Support from './Pages/Support/Support';
import WelcomeScreen from './Pages/WelcomeScreen/WelcomeScreen';
import UserPanel from './Pages/UserPanel/UserPanel';
import routes from './shared/routes';
import * as actions from './store/actions';
import NotFoundProviderSwitch from './components/Routes/NotFoundProviderSwitch/NotFoundProviderSwitch';

const App = (props) => {
    useEffect(() => {
        props.onTryAutoSignup();
    });

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
});

export default connect(null, mapDispatchToProps)(App);
