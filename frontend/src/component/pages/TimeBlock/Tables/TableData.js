let tableData = [];
let initialData;
let currentData;


const insertIntoTableData = (data) => {
    tableData.push(data);
}

const getTableData = () => {
    return tableData;
}

const setInitialValues = (data) => {
    initialData = data;
}

const getInitialValues = () => {
    return initialData;
}

const clearInitialValues = () => {
    initialData = undefined;
}

const setCurrentData = (data) => {
    currentData = data;
}

const getCurrentData = () => {
    return currentData;
}

export { insertIntoTableData, getTableData, setInitialValues, getInitialValues, clearInitialValues, setCurrentData, getCurrentData}