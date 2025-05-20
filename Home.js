import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    inviteCode: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/create-account', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setMessage(data.message);
    setFormData({
      username: '',
      phone: '',
      email: '',
      password: '',
      inviteCode: '',
    });
  };

  return (
    <div style={{maxWidth: '400px', margin: 'auto', padding: '20px'}}>
      <h2>Create Crypto Trading Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{width: '100%', padding: '8px', margin: '8px 0'}}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{width: '100%', padding: '8px', margin: '8px 0'}}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{width: '100%', padding: '8px', margin: '8px 0'}}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{width: '100%', padding: '8px', margin: '8px 0'}}
        />
        <input
          type="text"
          name="inviteCode"
          placeholder="Invite Code"
          value={formData.inviteCode}
          onChange={handleChange}
          style={{width: '100%', padding: '8px', margin: '8px 0'}}
        />
        <button type="submit" style={{padding: '10px 15px'}}>Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}