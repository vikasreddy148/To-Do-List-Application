import React from 'react';

const TaskList = ({ tasks, onEditClick, onDeleteClick }) => {
  if (tasks.length === 0) {
    return <p>No tasks available. Add one above!</p>;
  }

  return (
    <div>
      <h3>Task List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Priority</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Deadline</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{task.id}</td>
              <td style={tdStyle}>{task.description}</td>
              <td style={tdStyle}>{task.priority}</td>
              <td style={tdStyle}>{task.status}</td>
              <td style={tdStyle}>{task.deadline}</td>
              <td style={tdStyle}>
                <button 
                  onClick={() => onEditClick(task)}
                  style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDeleteClick(task.id)}
                  style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const tdStyle = {
  padding: '12px',
  textAlign: 'left'
};

export default TaskList;
