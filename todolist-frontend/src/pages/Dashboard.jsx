import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, CalendarCheck } from 'lucide-react';
import api from '../api/axios';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditClick = (task) => {
    navigate(`/edit-task/${task.id}`);
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="brand">
          <CalendarCheck size={26} />
          <span>To-Do Hub</span>
        </div>
        <button onClick={logout} className="secondary-btn">
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <main className="dashboard-content">
        <div className="welcome-banner">
          <h1>Welcome to your Dashboard!</h1>
          <p>You have successfully authenticated with the Spring Boot backend.</p>
        </div>

        <div className="dashboard-grid">
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3>Your Tasks</h3>
              <button onClick={() => navigate('/add-task')} className="primary-btn">Add Task</button>
            </div>
            
            <TaskList 
              tasks={tasks}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
