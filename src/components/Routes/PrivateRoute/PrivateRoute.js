import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route } from 'react-router';
import { useStore } from '../../../stores/stores';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const PrivateRoute = observer((props) => {
    const { authStore } = useStore();
    const renderRoute = () => {
        if (!authStore.user) {
            return <NotFoundPage />;
        }

        return props.children;
    };

    return <Route {...props}>{renderRoute()}</Route>;
});

export default PrivateRoute;
