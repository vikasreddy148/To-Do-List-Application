
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:8080/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch all tasks on mount
  useEffect(() => {
    // eslint-disable-next-line
    fetchTasks();
  }, []);

  const handleTaskAdded = async (taskData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskUpdated = async (id, taskData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (response.ok) {
        fetchTasks();
        setTaskToEdit(null); // Return to Add mode
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>To-Do List: Task Management</h1>
      <TaskForm
        key={taskToEdit ? taskToEdit.id : 'new'}
        taskToEdit={taskToEdit}
        onTaskAdded={handleTaskAdded}
        onTaskUpdated={handleTaskUpdated}
        onCancelEdit={() => setTaskToEdit(null)}
      />
      <TaskList
        tasks={tasks}
        onEditClick={(task) => setTaskToEdit(task)}
        onDeleteClick={handleDeleteTask}
      />
    </div>
  );
}

export default App;
export default App;
