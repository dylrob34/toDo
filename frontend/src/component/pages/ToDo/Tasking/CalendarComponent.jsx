import React, {useState} from 'react';
import Calendar from 'react-calendar';
import {getDateUTC} from "../../../../tools/time";


const CalendarComponent = (props) => {
    const [date, setDate] = useState(props.dueDate === null ? null : new Date(new Date(props.dueDate).getTime() + new Date().getTimezoneOffset() * 60000))

    const setValue = (date) => {
      const newDate = new Date(getDateUTC(date));
      props.save(newDate);
      const updateDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
      setDate(updateDate);
    }

  return <div className='react-calendar-size'>
    <div className='react-calendar-modal-arrow'></div>
      <Calendar 
        onChange={setValue}
        value={date}
      />

      
  </div>;

};

export default CalendarComponent;
