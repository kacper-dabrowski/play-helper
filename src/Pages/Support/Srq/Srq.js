import React, { useEffect, useState } from 'react';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';
import { useStore } from '../../../stores/stores';

const Srq = ({ onFetchSupportRequests }) => {
    const [template, setTemplate] = useState('');
    const { supportRequestsStore } = useStore();

    useEffect(() => {
        onFetchSupportRequests();
    }, [onFetchSupportRequests]);

    return (
        <>
            <SrqFinder
                onRemoveSupportRequest={supportRequestsStore.removeSupportRequest}
                removeSupportRequestRequest={supportRequestsStore.removeSupportRequestRequest}
                setTemplate={setTemplate}
                clickable
                fetchSupportRequestsRequest={supportRequestsStore.fetchSupportRequestsRequest}
                supportRequests={supportRequestsStore.supportRequests}
            />
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};

export default Srq;
