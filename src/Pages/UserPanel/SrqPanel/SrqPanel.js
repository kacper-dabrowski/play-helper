import React from 'react';
import SrqForm from '../../../components/Forms/SrqForm/SrqForm';
import SrqFinder from '../../../components/SrqFinder/SrqFinder';
import useRequest from '../../../hooks/useRequest';
import urls from '../../../shared/urls';

const SrqPanel = () => {
    const [response, error, loading, refresh] = useRequest(urls.srq, 'GET', null);

    return (
        <>
            <SrqForm entriesRefresh={refresh} />
            <SrqFinder editable response={response} error={error} loading={loading} />
        </>
    );
};

export default SrqPanel;
