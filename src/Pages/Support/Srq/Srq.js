import React, { useState } from 'react';
import MainTextarea from '../../../components/MainTextarea/MainTextarea';
import SrqFinder from '../../../components/SrqFinder/SrqFinder';

const Srq = () => {
    const [template, setTemplate] = useState('');
    return (
        <>
            <SrqFinder setTemplate={setTemplate} clickable />
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};

export default Srq;
