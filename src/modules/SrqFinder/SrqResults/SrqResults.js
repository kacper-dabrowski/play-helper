import cogoToast from 'cogo-toast';
import React, { useContext } from 'react';
import srqFormContext from '../../../contexts/srqFormContext';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import Result from '../../../components/Results/Result/SRQ/SrqResult';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { StyledResults } from './StyledSrqResults';
import { useErrorNotification } from '../../../hooks/useErrorNotification';

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
            onRemove={() => onRemoveSupportRequest(_id)}
        />
    ));

    return <StyledResults>{renderedContent}</StyledResults>;
};

export default SrqResults;
