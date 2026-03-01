import { useState } from 'react'
import { validateUserInput, createUser } from '../utils/userUtils'
import type { User } from '../utils/userUtils'

export type { User }

interface Props {
    onSaved: (user: User) => void
}

export default function UserForm({ onSaved }: Props) {
    const [name, setName] = useState('')
    const [hobbies, setHobbies] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const validationError = validateUserInput(name, hobbies)
        if (validationError) {
            setError(validationError)
            return
        }
        setError('')
        setIsLoading(true)

        try {
            const newUser = await createUser(name, hobbies)
            onSaved(newUser)
            setName('')
            setHobbies('')
        } catch (err) {
            setError('Failed to save profile. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">✏️</span>
                <h2>Add Profile</h2>
            </div>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ana García"
                    />
                </div>
                <div className="field">
                    <label htmlFor="hobbies">Hobbies</label>
                    <textarea
                        id="hobbies"
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
                        placeholder="e.g. painting, hiking, coding…"
                        rows={3}
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    )
}
