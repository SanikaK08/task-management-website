const API_BASEURL = 'http://localhost:5000/api/v1';

export const authService = {
  register: async (userData) => {
    const response = await fetch(`${API_BASEURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  registerAdmin: async (adminData) => {
    const response = await fetch(`${API_BASEURL}/auth/register-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData),
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASEURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem('token', data.token);
    }
    return { status: response.status, data };
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => localStorage.getItem('token'),
};

export const taskService = {
  createTask: async (taskData) => {
    const token = authService.getToken();
    const response = await fetch(`${API_BASEURL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  getTasks: async () => {
    const token = authService.getToken();
    const response = await fetch(`${API_BASEURL}/tasks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  getTaskById: async (id) => {
    const token = authService.getToken();
    const response = await fetch(`${API_BASEURL}/tasks/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  updateTask: async (id, taskData) => {
    const token = authService.getToken();
    const response = await fetch(`${API_BASEURL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  deleteTask: async (id) => {
    const token = authService.getToken();
    const response = await fetch(`${API_BASEURL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { status: response.status, data };
  },
};
