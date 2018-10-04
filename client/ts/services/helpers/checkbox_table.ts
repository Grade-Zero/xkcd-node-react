export const isSelected = (currentSelection: number[], key: number) => {
    return currentSelection.indexOf(key) !== -1
}

export const toggleSelection = (currenSelection: number[], key: number) => {
    const keyIndex = currenSelection.indexOf(key)
    let selection = []
    if (keyIndex >= 0) {
        selection = [...currenSelection.slice(0, keyIndex), ...currenSelection.slice(keyIndex + 1)]
    } else {
        selection = currenSelection.concat(key)
    }
    return selection
}

export const toggleAll = (currentSelectAll: boolean, currentRecords: any[]) => {
    const selectAll = currentSelectAll ? false : true;
    let selection = [];
    if (selectAll) {
        // we just push all the IDs onto the selection array
        selection = currentRecords.map(item => item._original._id);
    }
    return { selectAll, selection }
}
