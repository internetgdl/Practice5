import type { Phone } from '../utils/phoneUtils'

interface Props {
    phones: Phone[]
    onDelete: (id: number) => void
}

export default function PhoneList({ phones, onDelete }: Props) {
    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">📞</span>
                <h2>Phones</h2>
                <span className="badge">{phones.length}</span>
            </div>

            {phones.length === 0 ? (
                <p className="list-empty">No phone numbers yet. Add one above!</p>
            ) : (
                <ul className="user-list">
                    {phones.map((phone) => (
                        <li key={phone.id} className="user-item">
                            <div className="user-info">
                                <p className="user-name">{phone.name}</p>
                                <p className="user-hobbies">📱 {phone.phoneNumber}</p>
                                <p className="user-date">
                                    {new Date(phone.created_at).toLocaleString()}
                                </p>
                            </div>
                            <button
                                className="btn-delete"
                                onClick={() => onDelete(phone.id)}
                                aria-label={`Delete ${phone.name}'s phone number`}
                            >
                                🗑
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
