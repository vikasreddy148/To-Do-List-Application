import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import api from '../api/axios';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Since backend doesn't have a single GET endpoint, fetch all and filter
        const response = await api.get('/tasks');
        const foundTask = response.data.find(t => t.id === Number(id));
        if (foundTask) {
          setTaskToEdit(foundTask);
        } else {
          setError('Task not found or you do not have permission.');
        }
      } catch (err) {
        console.error('Error fetching task', err);
        setError('Failed to fetch the task.');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleTaskUpdated = async (taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      if (response.status === 200 || response.status === 201) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <button 
        onClick={() => navigate('/dashboard')}
        className="secondary-btn"
        style={{ marginBottom: '20px' }}
      >
        &larr; Back to Dashboard
      </button>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Edit Task</h1>
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
      
      {taskToEdit && (
        <TaskForm 
          taskToEdit={taskToEdit}
          onTaskUpdated={(_id, data) => handleTaskUpdated(data)}
          onCancelEdit={() => navigate('/dashboard')}
        />
      )}
    </div>
  );
}
