import React from 'react';
import TaskDueDate from './TaskDueDate'; // Importem el component de data
 
const TaskItem = ({ task, onToggleComplete, onDeleteTask, onUpdateTaskDate }) => { // Rep la nova prop
  return (
    <li key={task.id} className={task.completed ? 'completed' : ''}>
      <span onClick={() => onToggleComplete(task.id)}>
        {task.text}
      </span>
      
      {/* Integració del component de data */}
      <TaskDueDate
        taskId={task.id}
        dueDate={task.dueDate}
        onUpdateTaskDate={onUpdateTaskDate}
      />
      
      <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
    </li>
  );
};
 
export default TaskItem;
