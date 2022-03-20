import { FC } from 'react';
import { Spinner } from '../../../components/UI/spinner/spinner';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Maybe } from '../../../shared/types/types';
import { EntriesTable } from '../../components/entriesTable/entriesTable';
import { TableEntry } from '../../components/entriesTable/tableEntry/tableEntry';
import { handleAsyncOptionalClick, handleDefaultOptionalClick } from '../../handleOptionalClicks';
import { ModifySupportRequestDto, SupportRequestModel } from '../store/dto';
import { SupportRequestEntry } from './supportRequestEntry';

interface SupportRequestsTableProps {
    onRemoveEntry?: (id: string) => Promise<void>;
    onEditEntry?: (supportRequest: ModifySupportRequestDto) => void;
    onClickEntry?: (supportRequest: SupportRequestModel) => void;
    supportRequests: Maybe<SupportRequestModel[]>;
    fetchSupportRequestsStatus: RequestStatus;
}

export const SupportRequestsTable: FC<SupportRequestsTableProps> = ({
    fetchSupportRequestsStatus,
    supportRequests,
    onEditEntry,
    onRemoveEntry,
    onClickEntry,
}) => {
    if (fetchSupportRequestsStatus.loading) {
        return (
            <EntriesTable>
                <Spinner />
            </EntriesTable>
        );
    }

    return (
        <EntriesTable>
            {supportRequests?.length
                ? renderEntries(supportRequests, onClickEntry, onRemoveEntry, onEditEntry)
                : 'Brak wyników'}
        </EntriesTable>
    );
};

function renderEntries(
    supportRequests: SupportRequestModel[],
    onClickEntry?: (supportRequest: SupportRequestModel) => void,
    onRemoveEntry?: (id: string) => Promise<void>,
    onEditEntry?: (supportRequest: ModifySupportRequestDto) => void
): JSX.Element[] {
    return supportRequests.map((entryData) => (
        <TableEntry
            key={entryData._id}
            renderEntry={() => <SupportRequestEntry {...entryData} />}
            onEditEntry={handleDefaultOptionalClick<ModifySupportRequestDto>(entryData, onEditEntry)}
            onRemoveEntry={handleAsyncOptionalClick<SupportRequestModel['_id']>(entryData._id, onRemoveEntry)}
            onClickEntry={handleDefaultOptionalClick<SupportRequestModel>(entryData, onClickEntry)}
        />
    ));
}
