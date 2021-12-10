import React, { useEffect, useState } from 'react';
import SrqEditableForm from '../../../components/Forms/SrqForm/SrqEditableForm';
import SrqForm from '../../../components/Forms/SrqForm/SrqForm';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';
import srqFormContext from '../../../contexts/srqFormContext';

const SrqPanel = ({
    onFetchSupportRequests,
    fetchSupportRequestsRequest,
    supportRequests,
    onAddSupportRequest,
    addSupportRequestRequest,
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
                    <SrqEditableForm populatedFields={fieldsToPopulate} entriesRefresh={onFetchSupportRequests} />
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
                fetchSupportRequestsRequest={fetchSupportRequestsRequest}
                supportRequests={supportRequests}
                refresh={onFetchSupportRequests}
            />
        </srqFormContext.Provider>
    );
};

export default SrqPanel;
