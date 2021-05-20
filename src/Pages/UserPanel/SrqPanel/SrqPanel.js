import React, { useState } from 'react';
import SrqEditableForm from '../../../components/Forms/SrqForm/SrqEditableForm';
import SrqForm from '../../../components/Forms/SrqForm/SrqForm';
import SrqFinder from '../../../components/SrqFinder/SrqFinder';
import srqFormContext from '../../../contexts/srqFormContext';
import useRequest from '../../../hooks/useRequest';
import urls from '../../../shared/urls';

const SrqPanel = () => {
    const [response, error, loading, refresh] = useRequest(urls.srq, 'GET', null);
    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});

    return (
        <srqFormContext.Provider value={{ editMode, setEditMode, fieldsToPopulate, setFieldsToPopulate }}>
            <div>
                {editMode ? (
                    <SrqEditableForm populatedFields={fieldsToPopulate} entriesRefresh={refresh} />
                ) : (
                    <SrqForm entriesRefresh={refresh} />
                )}
            </div>
            <SrqFinder editable response={response} error={error} loading={loading} refresh={refresh} />
        </srqFormContext.Provider>
    );
};

export default SrqPanel;
