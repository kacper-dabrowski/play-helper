import { useDispatch, useSelector } from 'react-redux';

export const useStore = () => {
    const { user, auth, solutions, supportRequests } = useSelector((state) => state);

    const dispatch = useDispatch();
    // console.log({ user, auth, solutions, supportRequests });
    return {
        authStore: auth,
        userStore: user,
        solutionsStore: solutions,
        supportRequestsStore: supportRequests,
        dispatch,
    };
};
