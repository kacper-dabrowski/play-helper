import React, { useEffect, useState } from 'react';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';
import { useStore } from '../../../hooks/useStore';

const Srq = ({ onFetchSupportRequests }) => {
    const [template, setTemplate] = useState('');
    const { userStore } = useStore();

    useEffect(() => {
        onFetchSupportRequests();
    }, [onFetchSupportRequests]);

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
