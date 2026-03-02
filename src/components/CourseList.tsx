import type { Course } from '../utils/courseUtils'

interface Props {
    courses: Course[]
    onDelete: (id: number) => void
}

export default function CourseList({ courses, onDelete }: Props) {
    if (courses.length === 0) {
        return (
            <div className="module-card empty-state">
                <span className="empty-icon">📭</span>
                <p>No courses captured yet.</p>
                <p className="empty-subtext">Add a course using the form to see it here.</p>
            </div>
        )
    }

    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">📋</span>
                <h2>Course Roster</h2>
                <span className="badge">{courses.length}</span>
            </div>
            <ul className="user-list">
                {courses.map((course) => (
                    <li key={course.id} className="user-item">
                        <div className="user-info">
                            <h3 className="user-name">{course.name}</h3>
                            <p className="user-hobbies">
                                <strong>Description:</strong> {course.description}
                            </p>
                            <span className="user-date">
                                Added {new Date(course.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <button
                            onClick={() => onDelete(course.id)}
                            className="btn-delete"
                            title="Delete course"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                            >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
