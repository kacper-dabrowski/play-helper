import React, { useContext } from 'react';
import Result from '../../../components/Results/Result/SRQ/SrqResult';
import Spinner from '../../../components/UI/Spinner/Spinner';
import srqFormContext from '../../../contexts/srqFormContext';
import { useErrorNotification } from '../../../hooks/useErrorNotification';
import { StyledResults } from './StyledSrqResults';

const SrqResults = ({
    supportRequests,
    onRemoveSupportRequest,
    removeSupportRequestRequest,
    onCopy,
    editable,
    clickable,
}) => {
    const { setEditMode, setFieldsToPopulate } = useContext(srqFormContext);

    useErrorNotification(removeSupportRequestRequest);

    if (removeSupportRequestRequest.loading) {
        return (
            <StyledResults>
                <Spinner centered />
            </StyledResults>
        );
    }

    const renderedContent = supportRequests.map(({ _id, content, title, description, department }) => (
        <Result
            clickable={clickable}
            key={_id}
            id={_id}
            title={title}
            description={description}
            department={department}
            onClick={() => onCopy?.(content)}
            editable={editable}
            toggleEditMode={setEditMode}
            setFieldsToPopulate={setFieldsToPopulate}
            onRemove={() => onRemoveSupportRequest({ srqId: _id })}
        />
    ));

    return <StyledResults>{renderedContent}</StyledResults>;
};

export default SrqResults;
