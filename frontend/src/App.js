import React, { useState, useEffect } from 'react';
import { authService } from './services/api';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App">
      {user && <Navbar user={user} onLogout={handleLogout} />}
      {user ? (
        <TaskPage />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
