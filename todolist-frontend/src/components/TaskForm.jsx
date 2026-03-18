import React, { useState } from 'react';

const TaskForm = ({ onTaskAdded, taskToEdit, onTaskUpdated, onCancelEdit }) => {
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : 'Medium');
  const [status, setStatus] = useState(taskToEdit ? taskToEdit.status : 'Pending');
  const [deadline, setDeadline] = useState(taskToEdit ? taskToEdit.deadline : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { description, priority, status, deadline };
    
    if (taskToEdit) {
      onTaskUpdated(taskToEdit.id, taskData);
    } else {
      onTaskAdded(taskData);
    }
    
    // Reset form if not editing
    if (!taskToEdit) {
      setDescription('');
      setPriority('Medium');
      setStatus('Pending');
      setDeadline('');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
      <h3>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>Description: </label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Priority: </label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Status: </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Deadline: </label>
          <input 
            type="date" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {taskToEdit ? 'Update Task' : 'Add Task'}
          </button>
          {taskToEdit && (
            <button type="button" onClick={onCancelEdit} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
