let tableData = {};
let currentDraggedCellCallback = null;
let durationCallback = null;
let count = 0;


const setTableData = (data) => {
    tableData = data;
}

const getTableData = () => {
    return tableData;
}

const setDragged = (callback, dCallback) => {
    currentDraggedCellCallback = callback;
    durationCallback = dCallback;
}

const unSetDragged = () => {
    currentDraggedCellCallback = null;
    if (durationCallback !== null) {
        durationCallback(count);
    }
    count = 0;
    durationCallback = null;
    for (const [key, value] of Object.entries(tableData)) {
        value.setDraggedOverState(false);
    }
}

const drag = (e) => {
    e.preventDefault();
    currentDraggedCellCallback(e);
}

const setCount = (c) => {
    count = c;
}

export { setTableData, getTableData, setDragged, unSetDragged, drag, setCount }