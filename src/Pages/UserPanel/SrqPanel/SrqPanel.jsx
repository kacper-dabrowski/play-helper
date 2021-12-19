import React, { useEffect, useMemo, useState } from 'react';
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

    const formContext = useMemo(
        () => ({ editMode, setEditMode, fieldsToPopulate, setFieldsToPopulate }),
        [editMode, setEditMode, fieldsToPopulate, setFieldsToPopulate]
    );

    return (
        <srqFormContext.Provider value={formContext}>
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
