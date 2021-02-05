import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import Logout from './components/Logout/Logout';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import PlayNext from './containers/PlayNext/PlayNext';
import Support from './containers/Support/Support';
import WelcomeScreen from './containers/WelcomeScreen/WelcomeScreen';
import Solution from './Pages/Solution/Solution';
import * as actions from './store/actions';

const App = (props) => {
    useEffect(() => {
        props.onTryAutoSignup();
    });

    return (
        <Switch>
            <PrivateRoute path="/support">
                <Support />
            </PrivateRoute>
            <PrivateRoute path="/next">
                <PlayNext />
            </PrivateRoute>
            <PrivateRoute path="/solutions">
                <Solution />
            </PrivateRoute>
            <PrivateRoute path="/logout" render={() => <Logout />} />
            <Route path="/" exact>
                <WelcomeScreen />
            </Route>
        </Switch>
    );
};
const mapDispatchToProps = (dispatch) => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default connect(null, mapDispatchToProps)(App);
