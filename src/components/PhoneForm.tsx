import { useState } from 'react'
import { validatePhoneInput } from '../utils/phoneUtils'
import type { Phone } from '../utils/phoneUtils'

interface Props {
    onSaved: (phone: Phone) => void
}

export default function PhoneForm({ onSaved }: Props) {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const validationError = validatePhoneInput(name, phoneNumber)
        if (validationError) {
            setError(validationError)
            return
        }
        setError('')

        // Create new phone entry without connecting to DB
        const newPhone: Phone = {
            id: Date.now(),
            name: name.trim(),
            phoneNumber: phoneNumber.trim(),
            created_at: new Date().toISOString()
        }

        onSaved(newPhone)
        setName('')
        setPhoneNumber('')
    }

    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">📱</span>
                <h2>Add Phone</h2>
            </div>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="field">
                    <label htmlFor="phone-name">Name</label>
                    <input
                        id="phone-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Juan Pérez"
                    />
                </div>
                <div className="field">
                    <label htmlFor="phone-number">Phone Number</label>
                    <input
                        id="phone-number"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. +52 33 1234 5678"
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="btn-primary">
                    Save Phone
                </button>
            </form>
        </div>
    )
}
