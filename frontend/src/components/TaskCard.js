import React from 'react';
import './TaskCard.css';

function TaskCard({ task, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f39c12';
      case 'in-progress':
        return '#3498db';
      case 'completed':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return '#27ae60';
      case 'medium':
        return '#f39c12';
      case 'high':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="task-card">
      <div className="task-header-card">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span
            className="badge status-badge"
            style={{ backgroundColor: getStatusColor(task.status) }}
          >
            {task.status}
          </span>
          <span
            className="badge priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className="meta-item">
          <strong>Created:</strong>{' '}
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
        {task.updatedAt && (
          <span className="meta-item">
            <strong>Updated:</strong>{' '}
            {new Date(task.updatedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✏️ Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
          title="Delete task (Admin only)"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
