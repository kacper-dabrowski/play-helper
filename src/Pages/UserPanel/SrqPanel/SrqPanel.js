import React, { useEffect, useState } from 'react';
import SrqEditableForm from '../../../components/Forms/SrqForm/SrqEditableForm';
import SrqForm from '../../../components/Forms/SrqForm/SrqForm';
import srqFormContext from '../../../contexts/srqFormContext';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';

const SrqPanel = ({
    onFetchSupportRequests,
    fetchSupportRequestsRequest,
    supportRequests,
    onAddSupportRequest,
    addSupportRequestRequest,
    onRemoveSupportRequest,
    removeSupportRequestRequest,
    onSupportRequestUpdate,
    supportRequestUpdateRequestStatus,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});

    useEffect(() => {
        onFetchSupportRequests();
    }, [onFetchSupportRequests]);

    return (
        <srqFormContext.Provider value={{ editMode, setEditMode, fieldsToPopulate, setFieldsToPopulate }}>
            <div>
                {editMode ? (
                    <SrqEditableForm
                        populatedFields={fieldsToPopulate}
                        entriesRefresh={onFetchSupportRequests}
                        onSupportRequestUpdate={onSupportRequestUpdate}
                        updateRequestStatus={supportRequestUpdateRequestStatus}
                    />
                ) : (
                    <SrqForm
                        entriesRefresh={onFetchSupportRequests}
                        onAddSupportRequest={onAddSupportRequest}
                        addSupportRequestRequest={addSupportRequestRequest}
                    />
                )}
            </div>
            <SrqFinder
                editable
                onRemoveSupportRequest={onRemoveSupportRequest}
                fetchSupportRequestsRequest={fetchSupportRequestsRequest}
                supportRequests={supportRequests}
                refresh={onFetchSupportRequests}
                removeSupportRequestRequest={removeSupportRequestRequest}
            />
        </srqFormContext.Provider>
    );
};

export default SrqPanel;
