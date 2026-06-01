import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
