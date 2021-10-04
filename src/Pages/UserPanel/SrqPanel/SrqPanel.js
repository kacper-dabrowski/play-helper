import React, { useEffect, useState } from 'react';
import SrqEditableForm from '../../../components/Forms/SrqForm/SrqEditableForm';
import SrqForm from '../../../components/Forms/SrqForm/SrqForm';
import SrqFinder from '../../../modules/SrqFinder/SrqFinder';
import srqFormContext from '../../../contexts/srqFormContext';
import { useStore } from '../../../hooks/useStore';
import { fetchSupportRequests } from '../../../stores/user/user';

const SrqPanel = () => {
    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});
    const { userStore, dispatch } = useStore();
    useEffect(() => {
        dispatch(fetchSupportRequests());
    }, [dispatch]);

    return (
        <srqFormContext.Provider value={{ editMode, setEditMode, fieldsToPopulate, setFieldsToPopulate }}>
            <div>
                {editMode ? (
                    <SrqEditableForm
                        populatedFields={fieldsToPopulate}
                        entriesRefresh={() => dispatch(fetchSupportRequests())}
                    />
                ) : (
                    <SrqForm entriesRefresh={() => dispatch(fetchSupportRequests())} />
                )}
            </div>
            <SrqFinder
                editable
                requestStatus={userStore.fetchSupportRequestsStatus}
                supportRequests={userStore.supportRequests}
                refresh={() => dispatch(fetchSupportRequests())}
            />
        </srqFormContext.Provider>
    );
};

export default SrqPanel;
