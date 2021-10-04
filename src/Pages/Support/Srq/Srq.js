import React, { useEffect, useState } from 'react';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';
import { useStore } from '../../../hooks/useStore';
import { fetchSupportRequests } from '../../../stores/user/user';

const Srq = () => {
    const [template, setTemplate] = useState('');
    const { userStore, dispatch } = useStore();

    useEffect(() => {
        dispatch(fetchSupportRequests());
    }, [dispatch]);

    return (
        <>
            <SrqFinder
                setTemplate={setTemplate}
                clickable
                requestStatus={userStore.fetchSupportRequestsStatus}
                supportRequests={userStore.supportRequests}
            />
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};

export default Srq;
