import { useState, useEffect } from 'react'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import CourseForm from './components/CourseForm'
import CourseList from './components/CourseList'
import type { User } from './utils/userUtils'
import type { Course } from './utils/courseUtils'
import { fetchUsers, deleteUser } from './utils/userUtils'
import { fetchCourses, deleteCourse } from './utils/courseUtils'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    fetchUsers().then(setUsers).catch(console.error);
    fetchCourses().then(setCourses).catch(console.error);
  }, []);

  function handleUserSaved(user: User) {
    setUsers((prev) => [user, ...prev])
  }

  function handleCourseSaved(course: Course) {
    setCourses((prev) => [course, ...prev])
  }

  async function handleUserDelete(id: number) {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter(u => u.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  async function handleCourseDelete(id: number) {
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter(c => c.id !== id));
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
          <span className="gradient-text">Profile</span> & <span className="gradient-text">Course</span> Hub
        </h1>
        <p className="app-subtitle">Capture and explore user profiles and system courses</p>
        <button onClick={triggerError} style={{ marginTop: '1rem', backgroundColor: '#e74c3c' }} className="btn-primary">
          Generate Test Error
        </button>
      </header>

      <main className="app-grid">
        <section className="dashboard-section">
          <UserForm onSaved={handleUserSaved} />
          <UserList users={users} onDelete={handleUserDelete} />
        </section>
        <section className="dashboard-section">
          <CourseForm onSaved={handleCourseSaved} />
          <CourseList courses={courses} onDelete={handleCourseDelete} />
        </section>
      </main>
    </div>
  )
}

export default App
