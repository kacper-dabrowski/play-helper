import { useDispatch, useSelector } from 'react-redux';

export const useStore = () => {
    const authStore = useSelector((state) => state.auth);
    const userStore = useSelector((state) => state.user);

    const dispatch = useDispatch();
    return { authStore, userStore, dispatch };
};
