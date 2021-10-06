import React, { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useStore } from './useStore';

jest.mock('react-redux', () => ({
    useSelector: () => ({ auth: 'authStore', user: 'userStore' }),
    useDispatch: jest.fn(),
}));

function getFakeComponent() {
    return <FakeComponent />;
}

function FakeComponent() {
    const { userStore, authStore, dispatch } = useStore();

    useEffect(() => {
        dispatch('hello!');
    }, [dispatch]);

    return (
        <>
            <div>{userStore}</div>
            <div>{authStore}</div>
        </>
    );
}

describe('hooks - useStore', () => {
    it('should give an access to the stores and dispatch', () => {
        const dispatchMock = jest.fn();
        useDispatch.mockImplementation(() => dispatchMock);

        render(getFakeComponent());

        return waitFor(() => {
            expect(screen.queryByText('userStore')).toBeInTheDocument();
            expect(screen.queryByText('authStore')).toBeInTheDocument();
            expect(dispatchMock).toHaveBeenCalledWith('hello!');
        });
    });
});
