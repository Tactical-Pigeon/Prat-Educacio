import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';  // ✅ Moved to top

const TaskDueDate = ({ taskId, dueDate, onUpdateTaskDate }) => {
  const dateValue = dueDate ? new Date(dueDate) : null;

  const handleDateChange = (newDate) => {
    onUpdateTaskDate(taskId, newDate);
  };

  return (
    <div style={{ marginLeft: '10px' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data Límit"
          value={dateValue}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </LocalizationProvider>
      {dueDate && <p>Límit: {format(dateValue, 'dd/MM/yyyy')}</p>}
    </div>
  );
};

export default TaskDueDate;
