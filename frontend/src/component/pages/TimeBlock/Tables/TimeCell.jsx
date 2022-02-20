import React, {useEffect, useRef} from 'react'
import { insertIntoTableData } from './TableData';

const TimeCell = ({time, row, setHeight}) => {
    const cellRef = useRef(null);

    useEffect(() => {
        if (cellRef !== null) {
            const rect = cellRef.current.getBoundingClientRect();
            if (row === 0) setHeight(rect.bottom - rect.top);
            insertIntoTableData({top: rect.top, bottom: rect.bottom, row})
        }
    }, [cellRef.current])

    return (
        <div ref={cellRef}>{time}</div>
    )
}

export default TimeCell
