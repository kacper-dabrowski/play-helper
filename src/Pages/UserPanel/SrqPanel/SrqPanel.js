import React from 'react';
import SrqForm from '../../../components/Forms/SrqForm/SrqForm';
import SrqFinder from '../../../components/SrqFinder/SrqFinder';

const SrqPanel = () => {
    return (
        <>
            <SrqForm />
            <SrqFinder editable />
        </>
    );
};

export default SrqPanel;
