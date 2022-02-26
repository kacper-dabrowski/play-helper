import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';

const Srq = ({ onFetchSupportRequests }) => {
    const [template, setTemplate] = useState('');
    const supportRequestsStore = useSelector((state) => state.supportRequests);
    useEffect(() => {
        onFetchSupportRequests();
    }, [onFetchSupportRequests]);

    return (
        <>
            <SrqFinder
                setTemplate={setTemplate}
                clickable
                requestStatus={supportRequestsStore.fetchSupportRequestsStatus}
                supportRequests={supportRequestsStore.supportRequests}
            />
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};

export default Srq;
