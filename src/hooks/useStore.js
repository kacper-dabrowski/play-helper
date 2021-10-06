import { useDispatch, useSelector } from 'react-redux';

export const useStore = () => {
    const { user, auth } = useSelector((state) => state);

    const dispatch = useDispatch();
    return { authStore: auth, userStore: user, dispatch };
};
