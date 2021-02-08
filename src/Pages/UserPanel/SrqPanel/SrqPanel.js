import React, { useState } from 'react';
import SrqForm from '../../../components/Forms/SrqForm/SrqForm';
import SrqFinder from '../../../components/SrqFinder/SrqFinder';

const SrqPanel = () => {
    const [entriesRefresh, setEntriesRefresh] = useState(() => {});

    return (
        <>
            <SrqForm entriesRefresh={entriesRefresh} />
            <SrqFinder editable setEntriesRefresh={setEntriesRefresh} />
        </>
    );
};

export default SrqPanel;
