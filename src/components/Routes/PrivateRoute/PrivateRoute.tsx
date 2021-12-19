import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Route } from 'react-router';
import { useStore } from '../../../stores/stores';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

interface PrivateRouteProps {
    path: string;
    component?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = observer(({ children, path }) => {
    const { authStore } = useStore();
    const renderRoute = () => {
        if (!authStore.user) {
            return <NotFoundPage />;
        }

        return children;
    };

    return <Route path={path}>{renderRoute()}</Route>;
});

export default PrivateRoute;
