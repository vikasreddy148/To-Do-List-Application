import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, CalendarCheck } from 'lucide-react';

export default function Dashboard() {
  const { logout } = useAuth();

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
          <div className="card">
            <h3>Your Tasks</h3>
            <p>You currently have no pending tasks. Start adding some!</p>
            <button className="primary-btn">Add Task</button>
          </div>
          <div className="card">
            <h3>Statistics</h3>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-value">0</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">0</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
