import React, { useEffect, useState } from 'react';
import './App.css';

type User = Record<string, string>;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const res = await fetch(`${apiUrl}/api/users`);
      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await res.json();
      setUsers(data);
      if (data.length > 0) {
        setFields(Object.keys(data[0]));
      } else {
        setFields([]);
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setUsers([]);
      setFields([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // WebSocket for real-time updates
    let socket: any;
    import('./utils/socket').then(({ getSocket }) => {
      try {
        socket = getSocket();
        socket.on('userDataUpdated', () => {
          fetchUsers();
        });
      } catch (err) {
        // Ignore socket errors for now
      }
    });
    return () => {
      if (socket) {
        socket.off('userDataUpdated');
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className="App" style={{ padding: 24, fontFamily: 'Arial, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <h1>User Data Table</h1>
      <p>
        This table displays the latest user information from the system. The data is always up-to-date with the CSV file.
      </p>
      {loading && <div>Loading user data...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!loading && !error && (
        users.length === 0 ? (
          <div>No user data available.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: 16 }}>
              <thead>
                <tr>
                  {fields.map(field => (
                    <th
                      key={field}
                      style={{
                        border: '1px solid #ccc',
                        background: '#f5f5f5',
                        padding: '8px',
                        textAlign: 'left'
                      }}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    {fields.map(field => (
                      <td
                        key={field}
                        style={{
                          border: '1px solid #eee',
                          padding: '8px',
                          background: idx % 2 === 0 ? '#fff' : '#fafafa'
                        }}
                      >
                        {user[field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

export default App;
