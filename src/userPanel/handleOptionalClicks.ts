export function handleEditEntryIfUserIsAnAuthor<T>(entry: T, isAuthor?: boolean, onEditEntry?: (entry: T) => void) {
    if (!isAuthor || !onEditEntry) {
        return undefined;
    }

    return () => onEditEntry(entry);
}

export function handleRemoveEntryIfUserIsAnAuthor(
    entryId: string,
    isAuthor?: boolean,
    onRemoveEntry?: (solutionId: string) => Promise<void>
) {
    if (!isAuthor || !onRemoveEntry) {
        return undefined;
    }

    return async () => onRemoveEntry(entryId);
}

export function handleClickEntry<T>(entry: T, onClickEntry?: (parameter: T) => void) {
    if (!onClickEntry) {
        return undefined;
    }

    return () => onClickEntry(entry);
}
