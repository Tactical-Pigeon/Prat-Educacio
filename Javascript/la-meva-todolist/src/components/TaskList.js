import React from 'react';
import TaskItem from './TaskItem'; // Importem el component individual
 
// Rep la llista de tasques i les funcions per 'props'
const TaskList = ({ tasks, onToggleComplete, onDeleteTask, onUpdateTaskDate }) => { // Rep la nova prop
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onUpdateTaskDate={onUpdateTaskDate} // Passa la nova prop a TaskItem
        />
      ))}
    </ul>
  );
};

 
export default TaskList;
 
