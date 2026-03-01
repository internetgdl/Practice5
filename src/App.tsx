import { useState, useEffect } from 'react'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import type { User } from './utils/userUtils'
import { fetchUsers, deleteUser } from './utils/userUtils'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers().then(setUsers).catch(console.error);
  }, []);

  function handleSaved(user: User) {
    setUsers((prev) => [user, ...prev])
  }

  async function handleDelete(id: number) {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter(u => u.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  async function triggerError() {
    try {
      await fetch('/api/error');
    } catch (e) {
      console.error("Error endpoint called:", e);
    }
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>
          <span className="gradient-text">Profile</span> Hub
        </h1>
        <p className="app-subtitle">Capture and explore user profiles</p>
        <button onClick={triggerError} style={{ marginTop: '1rem', backgroundColor: '#e74c3c' }} className="btn-primary">
          Generate Test Error
        </button>
      </header>

      <main className="app-grid">
        <UserForm onSaved={handleSaved} />
        <UserList users={users} onDelete={handleDelete} />
      </main>
    </div>
  )
}

export default App
