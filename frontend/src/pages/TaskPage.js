import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './TaskPage.css';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const { status, data } = await taskService.getTasks();
      if (status === 200) {
        setTasks(data.tasks || []);
      } else {
        setError(data.message || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError('An error occurred while fetching tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const { status, data } = await taskService.createTask(taskData);
      if (status === 201) {
        setTasks([...tasks, data.task || data]);
        setError('');
      } else {
        setError(data.message || 'Failed to create task');
      }
    } catch (err) {
      setError('An error occurred while creating task');
      console.error(err);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const { status, data } = await taskService.updateTask(id, taskData);
      if (status === 200) {
        setTasks(tasks.map((task) => (task._id === id ? data.task || data : task)));
        setEditingTask(null);
        setError('');
      } else {
        setError(data.message || 'Failed to update task');
      }
    } catch (err) {
      setError('An error occurred while updating task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const { status, data } = await taskService.deleteTask(id);
        if (status === 200) {
          setTasks(tasks.filter((task) => task._id !== id));
          setError('');
        } else {
          setError(data.message || 'Failed to delete task (Admin only)');
        }
      } catch (err) {
        setError('An error occurred while deleting task');
        console.error(err);
      }
    }
  };

  return (
    <div className="task-page">
      <div className="task-container">
        <div className="task-header">
          <h1>Task Management</h1>
          {error && <div className="page-error">{error}</div>}
        </div>

        <div className="task-content">
          <div className="form-section">
            <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
            <TaskForm
              onSubmit={editingTask ? 
                (data) => handleUpdateTask(editingTask._id, data) : 
                handleCreateTask
              }
              initialTask={editingTask}
              onCancel={() => setEditingTask(null)}
            />
          </div>

          <div className="list-section">
            <h2>Your Tasks</h2>
            {loading ? (
              <p className="loading">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="no-tasks">No tasks yet. Create one to get started!</p>
            ) : (
              <TaskList
                tasks={tasks}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
