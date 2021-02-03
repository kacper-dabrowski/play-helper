import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import Logout from './components/Logout/Logout';
import PlayNext from './containers/PlayNext/PlayNext';
import Support from './containers/Support/Support';
import WelcomeScreen from './containers/WelcomeScreen/WelcomeScreen';
import * as actions from './store/actions';

const App = (props) => {
    useEffect(() => {
        props.onTryAutoSignup();
    });
    return (
        <Switch>
            <Route path="/support">
                <Support />
            </Route>
            <Route path="/next">
                <PlayNext />
            </Route>
            <Route path="/logout" render={() => <Logout />} />
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
