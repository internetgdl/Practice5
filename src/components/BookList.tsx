import type { Book } from '../utils/bookUtils'

interface Props {
    books: Book[]
    onDelete: (id: number) => void
}

export default function BookList({ books, onDelete }: Props) {
    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">📖</span>
                <h2>Books</h2>
                <span className="badge">{books.length}</span>
            </div>

            {books.length === 0 ? (
                <p className="list-empty">No books yet. Add one above!</p>
            ) : (
                <ul className="user-list">
                    {books.map((book) => (
                        <li key={book.id} className="user-item">
                            <div className="user-info">
                                <p className="user-name">{book.title}</p>
                                <p className="user-hobbies" style={{ fontSize: '0.9rem', color: '#666' }}>Pages: {book.pages}</p>
                                <p style={{ fontSize: '0.9rem', color: '#444', marginTop: '0.25rem' }}>{book.descripcion}</p>
                                <p className="user-date" style={{ marginTop: '0.5rem' }}>
                                    {new Date(book.created_at).toLocaleString()}
                                </p>
                            </div>
                            <button
                                className="btn-delete"
                                onClick={() => onDelete(book.id)}
                                aria-label={`Delete ${book.title}`}
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
