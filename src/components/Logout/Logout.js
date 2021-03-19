import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../store/actions';

const Logout = (props) => {
    useEffect(() => {
        clearTimeout(props.logoutTimeoutId);
        props.onLogout();
    });

    return <Redirect to="/" />;
};
const mapStateToProps = (state) => ({
    logoutTimeoutId: state.auth.logoutTimeoutId,
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(actions.logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
