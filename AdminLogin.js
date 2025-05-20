import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    });

    if(response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/admin-panel');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{maxWidth: '300px', margin: 'auto', padding: '20px'}}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{width: '100%', padding: '8px', margin: '8px 0'}}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{width: '100%', padding: '8px', margin: '8px 0'}}
        />
        <button type="submit" style={{padding: '10px 15px'}}>Login</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}