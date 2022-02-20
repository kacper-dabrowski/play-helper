import React, { useContext } from 'react';
import srqFormContext from '../../../contexts/srqFormContext';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import Result from '../../../components/Results/Result/SRQ/SrqResult';
import Spinner from '../../../components/UI/spinner/spinner';
import { StyledResults } from './StyledSrqResults';
import { toastProvider } from '../../../libs/toast';

const SrqResults = ({ supportRequests, error, isLoading, onCopy, editable, clickable, refresh }) => {
    const { setEditMode, setFieldsToPopulate } = useContext(srqFormContext);
    const { requestHandler } = useRequest(urls.srq, REQUEST_METHODS.DELETE);

    const srqRemovedHandler = async (id) => {
        try {
            await requestHandler(null, () => `${urls.srq}/${id}`);
            toastProvider.success('Pomyślnie usunięto SRQ');
            refresh?.();
        } catch (deletionError) {
            toastProvider.error(deletionError.message);
        }
    };
    if (error) {
        return (
            <StyledResults>
                <p>{error.message}</p>
            </StyledResults>
        );
    }

    if (isLoading) {
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
            onRemove={srqRemovedHandler}
        />
    ));

    return <StyledResults>{renderedContent}</StyledResults>;
};

export default SrqResults;
