import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import api from '../api/axios';

export default function TaskPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleTaskAdded = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      if (response.status === 200 || response.status === 201) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <button 
        onClick={() => navigate('/dashboard')}
        className="secondary-btn"
        style={{ marginBottom: '20px' }}
      >
        &larr; Back to Dashboard
      </button>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Add New Task</h1>
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
      <TaskForm 
        onTaskAdded={handleTaskAdded}
      />
    </div>
  );
}
