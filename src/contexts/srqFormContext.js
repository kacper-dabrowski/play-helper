import React from 'react';

const srqFormContext = React.createContext({
    editMode: false,
    setEditMode: () => {},
    fieldsToPopulate: {},
    setFieldsToPopulate: () => {},
});

export default srqFormContext;
