import { useState } from 'react'
import { validateCourseInput, createCourse } from '../utils/courseUtils'
import type { Course } from '../utils/courseUtils'

export type { Course }

interface Props {
    onSaved: (course: Course) => void
}

export default function CourseForm({ onSaved }: Props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const validationError = validateCourseInput(name, description)
        if (validationError) {
            setError(validationError)
            return
        }
        setError('')
        setIsLoading(true)

        try {
            const newCourse = await createCourse(name, description)
            onSaved(newCourse)
            setName('')
            setDescription('')
        } catch (err) {
            setError('Failed to save course. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">📚</span>
                <h2>Add Course</h2>
            </div>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="field">
                    <label htmlFor="courseName">Course Name</label>
                    <input
                        id="courseName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Introduction to React"
                    />
                </div>
                <div className="field">
                    <label htmlFor="courseDesc">Description</label>
                    <textarea
                        id="courseDesc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Learn the fundamentals of modern web development…"
                        rows={3}
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Course'}
                </button>
            </form>
        </div>
    )
}
