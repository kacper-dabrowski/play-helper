import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../stores/store';
import { SearchBox } from '../components/searchBox/searchBox';
import { SupportRequestForm } from './form/form';
import * as Styled from '../components/styles/styledContainer';
import {
    createSupportRequest,
    fetchSupportRequests,
    removeSupportRequest,
    updateSupportRequest,
} from './store/supportRequests';
import { SupportRequestModel } from './store/dto';
import { Maybe } from '../../shared/types/types';
import { SupportRequestsTable } from './supportRequestsTable/supportRequestsTable';
import useResultsFilter from '../../hooks/useResultsFilter';
import { searchByContainingSearchPhrase } from '../components/search/search';

export const SupportRequestsEditor: FC = () => {
    const { supportRequests, addSupportRequestsStatus, fetchSupportRequestsStatus } = useSelector(
        (state: StoreState) => state.supportRequests
    );
    const dispatch = useDispatch();
    const [selectedSupportRequest, setSelectedSupportRequest] = useState<Maybe<SupportRequestModel>>(null);
    const {
        searchResults: filteredSupportRequests,
        searchQuery,
        setSearchQuery,
    } = useResultsFilter(supportRequests, searchByContainingSearchPhrase);

    const onFetchSupportRequests = useCallback(async () => {
        await dispatch(fetchSupportRequests());
    }, [dispatch]);

    useEffect(() => {
        onFetchSupportRequests();
    }, [onFetchSupportRequests]);

    const onAddSupportRequest = useCallback(
        async (supportRequest: SupportRequestModel) => {
            await dispatch(createSupportRequest(supportRequest));
        },
        [dispatch]
    );

    const onEditSupportRequest = useCallback(
        async (supportRequest: SupportRequestModel) => {
            await dispatch(updateSupportRequest({ supportRequest, supportRequestId: supportRequest._id }));
        },
        [dispatch]
    );

    const onRemoveSupportRequest = useCallback(
        async (supportRequestId: string) => {
            await dispatch(removeSupportRequest({ supportRequestId }));
            await onFetchSupportRequests();
        },
        [dispatch, onFetchSupportRequests]
    );

    return (
        <>
            <SupportRequestForm
                onRefreshSupportRequest={onFetchSupportRequests}
                addSupportRequestStatus={addSupportRequestsStatus}
                onAddSupportRequest={onAddSupportRequest}
                onEditSupportRequest={onEditSupportRequest}
                onClearForm={() => setSelectedSupportRequest(null)}
                selectedSupportRequest={selectedSupportRequest}
            />

            <Styled.container>
                <SearchBox value={searchQuery} setValue={setSearchQuery} />
                <SupportRequestsTable
                    onRemoveEntry={onRemoveSupportRequest}
                    onEditEntry={(supportRequest: SupportRequestModel) => setSelectedSupportRequest(supportRequest)}
                    supportRequests={filteredSupportRequests}
                    fetchSupportRequestsStatus={fetchSupportRequestsStatus}
                />
            </Styled.container>
        </>
    );
};
