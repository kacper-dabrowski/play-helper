import React, { useCallback, useEffect, useState } from 'react';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';
import { useStore } from '../../../hooks/useStore';
import { removeSupportRequests } from '../../../stores/supportRequests/supportRequests';

const Srq = ({ onFetchSupportRequests }) => {
    const [template, setTemplate] = useState('');
    const { supportRequestsStore, dispatch } = useStore();

    const onRemoveSupportRequest = useCallback(
        (id) => {
            dispatch(removeSupportRequests({ srqId: id }));
        },
        [dispatch]
    );

    useEffect(() => {
        onFetchSupportRequests();
    }, [onFetchSupportRequests]);

    return (
        <>
            <SrqFinder
                onRemoveSupportRequest={onRemoveSupportRequest}
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
