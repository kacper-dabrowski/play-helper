import React, { useState } from 'react';
import SrqEditableForm from '../../../components/Forms/SrqForm/SrqEditableForm';
import SrqForm from '../../../components/Forms/SrqForm/SrqForm';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';
import srqFormContext from '../../../contexts/srqFormContext';
import useRequest from '../../../hooks/useRequest';
import urls from '../../../shared/urls';

const SrqPanel = () => {
    const { error, response, loading, requestHandler } = useRequest(urls.srq);
    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});

    return (
        <srqFormContext.Provider value={{ editMode, setEditMode, fieldsToPopulate, setFieldsToPopulate }}>
            <div>
                {editMode ? (
                    <SrqEditableForm populatedFields={fieldsToPopulate} entriesRefresh={requestHandler} />
                ) : (
                    <SrqForm entriesRefresh={requestHandler} />
                )}
            </div>
            <SrqFinder editable response={response} error={error} loading={loading} refresh={requestHandler} />
        </srqFormContext.Provider>
    );
};

export default SrqPanel;
