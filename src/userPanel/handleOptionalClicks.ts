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

export function handleDefaultOptionalClick<T>(entry: T, clickHandler?: (parameter: T) => void) {
    if (!clickHandler) {
        return undefined;
    }

    return () => clickHandler(entry);
}

export function handleAsyncOptionalClick<T>(entry: T, clickHandler?: (parameter: T) => Promise<void>) {
    if (!clickHandler) {
        return undefined;
    }

    return () => clickHandler(entry);
}
