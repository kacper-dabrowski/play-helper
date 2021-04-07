import React, { useContext } from 'react';
import srqFormContext from '../../../contexts/srqFormContext';
import useFeedbackSnackbars from '../../../hooks/useFeedbackSnackbars';
import axios from '../../../libs/axios';
import urls from '../../../shared/urls';
import Result from '../../Results/Result/SRQ/SrqResult';
import ResultWithButtons from '../../Results/Result/SRQ/SrqResultWithButtons/SrqResultWithButtons';
import Spinner from '../../UI/Spinner/Spinner';
import { StyledResults } from './StyledSrqResults';

const SrqResults = ({ supportRequests, error, isLoading, onCopy, editable, clickable, refresh }) => {
    const [setSuccess, setError] = useFeedbackSnackbars();
    const { setEditMode, setFieldsToPopulate } = useContext(srqFormContext);

    const srqRemovedHandler = async (id) => {
        try {
            setSuccess('');
            await axios.delete(`${urls.srq}/${id}`);
            setSuccess('Pomyślnie usunięto SRQ');
            refresh();
        } catch (deletionError) {
            setError(deletionError.message);
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
    let renderedContent = '';

    if (!editable) {
        renderedContent = supportRequests.map(({ _id, content, title, description, department }) => (
            <Result
                clickable={clickable}
                key={_id}
                title={title}
                description={description}
                department={department}
                onClick={() => onCopy(content)}
            />
        ));
    } else {
        renderedContent = supportRequests.map(({ _id, content, title, description, department }) => (
            <ResultWithButtons
                clickable={clickable}
                key={_id}
                id={_id}
                content={content}
                title={title}
                description={description}
                department={department}
                onRemove={srqRemovedHandler}
                toggleEditMode={setEditMode}
                setFieldsToPopulate={setFieldsToPopulate}
            />
        ));
    }

    return <StyledResults>{renderedContent}</StyledResults>;
};

export default SrqResults;
