import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/admin-login');
      return;
    }

    fetch('http://localhost:5000/api/admin/accounts', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      if(res.status === 403) {
        navigate('/admin-login');
        return;
      }
      return res.json();
    })
    .then(data => {
      if(data) setAccounts(data);
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin-login');
  };

  return (
    <div style={{maxWidth: '600px', margin: 'auto', padding: '20px'}}>
      <h2>Admin Panel</h2>
      <button onClick={handleLogout} style={{marginBottom: '20px'}}>Logout</button>
      <table border="1" width="100%" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Password</th>
            <th>Invite Code</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc, index) => (
            <tr key={index}>
              <td>{acc.username}</td>
              <td>{acc.phone}</td>
              <td>{acc.email}</td>
              <td>{acc.password}</td>
              <td>{acc.inviteCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}