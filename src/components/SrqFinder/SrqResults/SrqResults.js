import cogoToast from 'cogo-toast';
import React, { useContext } from 'react';
import srqFormContext from '../../../contexts/srqFormContext';
import axios from '../../../libs/axios';
import urls from '../../../shared/urls';
import Result from '../../Results/Result/SRQ/SrqResult';
import Spinner from '../../UI/Spinner/Spinner';
import { StyledResults } from './StyledSrqResults';

const SrqResults = ({ supportRequests, error, isLoading, onCopy, editable, clickable, refresh }) => {
    const { setEditMode, setFieldsToPopulate } = useContext(srqFormContext);

    const srqRemovedHandler = async (id) => {
        try {
            await axios.delete(`${urls.srq}/${id}`);
            cogoToast.success('Pomyślnie usunięto SRQ');
            refresh?.();
        } catch (deletionError) {
            cogoToast.error(deletionError.message);
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
