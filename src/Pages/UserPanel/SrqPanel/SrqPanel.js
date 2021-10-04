import React, { useState } from 'react';
import SrqEditableForm from '../../../components/Forms/SrqForm/SrqEditableForm';
import SrqForm from '../../../components/Forms/SrqForm/SrqForm';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';
import srqFormContext from '../../../contexts/srqFormContext';

const SrqPanel = ({ onFetchSupportRequests, requestStatus, supportRequests }) => {
    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});

    return (
        <srqFormContext.Provider value={{ editMode, setEditMode, fieldsToPopulate, setFieldsToPopulate }}>
            <div>
                {editMode ? (
                    <SrqEditableForm populatedFields={fieldsToPopulate} entriesRefresh={onFetchSupportRequests} />
                ) : (
                    <SrqForm entriesRefresh={onFetchSupportRequests} />
                )}
            </div>
            <SrqFinder
                editable
                requestStatus={requestStatus}
                supportRequests={supportRequests}
                refresh={onFetchSupportRequests}
            />
        </srqFormContext.Provider>
    );
};

export default SrqPanel;
