import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainTextarea } from '../../components/Inputs/MainTextarea/MainTextarea';
import { StoreState } from '../../stores/store';
import { SearchBox } from '../components/searchBox/searchBox';
import * as Styled from '../components/styles/styledContainer';
import { SupportRequestModel } from './store/dto';
import { fetchSupportRequests } from './store/supportRequests';
import { SupportRequestsTable } from './supportRequestsTable/supportRequestsTable';

export const SupportRequestsPicker: FC = () => {
    const { supportRequests, fetchSupportRequestsStatus } = useSelector((state: StoreState) => state.supportRequests);
    const [template, setTemplate] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    const onClickEntry = useCallback((supportRequest: SupportRequestModel) => {
        setTemplate(supportRequest.content);
    }, []);

    useEffect(() => {
        dispatch(fetchSupportRequests());
    }, [dispatch]);

    return (
        <>
            <Styled.container>
                <SearchBox value={searchValue} setValue={setSearchValue} />
                <SupportRequestsTable
                    supportRequests={supportRequests}
                    fetchSupportRequestsStatus={fetchSupportRequestsStatus}
                    onClickEntry={onClickEntry}
                />
            </Styled.container>
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};
