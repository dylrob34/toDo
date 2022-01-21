let tableData = {};
let currentDraggedCellCallback = null;
let count = 0;


const setTableData = (data) => {
    tableData = data;
}

const getTableData = () => {
    return tableData;
}

const setDragged = (callback) => {
    currentDraggedCellCallback = callback;
}

const unSetDragged = () => {
    currentDraggedCellCallback = null;
    count = 0;
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

const getCount = () => {
    return count
}

export { setTableData, getTableData, setDragged, unSetDragged, drag, setCount, getCount}