import React, { useState } from 'react';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';
import useRequest from '../../../hooks/useRequest';
import urls from '../../../shared/urls';

const Srq = () => {
    const [template, setTemplate] = useState('');
    const { error, response, loading } = useRequest(urls.srq);

    return (
        <>
            <SrqFinder setTemplate={setTemplate} clickable response={response} error={error} loading={loading} />
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};

export default Srq;
