import React, { useState } from 'react';
import MainTextarea from '../../../components/MainTextarea/MainTextarea';
import SrqFinder from '../../../components/SrqFinder/SrqFinder';
import useRequest from '../../../hooks/useRequest';
import urls from '../../../shared/urls';

const Srq = () => {
    const [template, setTemplate] = useState('');
    const [response, error, loading] = useRequest(urls.srq, 'GET', null);

    return (
        <>
            <SrqFinder setTemplate={setTemplate} clickable response={response} error={error} loading={loading} />
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};

export default Srq;
