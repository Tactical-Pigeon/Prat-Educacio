import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';   // ← import the form component

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Comprar pa', completed: false, dueDate: null }, // Afegim dueDate
    { id: 2, text: 'Acabar informe', completed: true, dueDate: new Date().toISOString() }, 
  ]);

  // Add a new task (called from TaskForm)
  const handleAddTask = (text) => {
    const task = {
      id: Date.now(),
      text: text,
      completed: false,
      dueDate: null, // Nou camp
    };
    setTasks([...tasks, task]);
  };

  // Toggle complete status
  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const handleUpdateTaskDate = (taskId, newDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, dueDate: newDate ? newDate.toISOString() : null } : task
      )
    );
  };

  return (
    <div className="app-container">
      <div className="todo-container">
        <h1>La Meva Llista de Tasques</h1>

        {/* Form component to add new tasks */}
        <TaskForm onAddTask={handleAddTask} />

        {/* List component to display tasks */}
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
	  onUpdateTaskDate={handleUpdateTaskDate} 
        />
      </div>
    </div>
  );
}

export default App;