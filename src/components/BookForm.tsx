import { useState } from 'react'
import { validateBookInput } from '../utils/bookUtils'
import type { Book } from '../utils/bookUtils'

interface Props {
    onSaved: (book: Book) => void
}

export default function BookForm({ onSaved }: Props) {
    const [title, setTitle] = useState('')
    const [pages, setPages] = useState<number | ''>('')
    const [descripcion, setDescripcion] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const parsedPages = Number(pages)
        const validationError = validateBookInput(title, parsedPages, descripcion)
        if (validationError) {
            setError(validationError)
            return
        }
        setError('')

        // Create new book entry without connecting to DB
        const newBook: Book = {
            id: Date.now(),
            title: title.trim(),
            pages: parsedPages,
            descripcion: descripcion.trim(),
            created_at: new Date().toISOString()
        }

        onSaved(newBook)
        setTitle('')
        setPages('')
        setDescripcion('')
    }

    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">📚</span>
                <h2>Add Book</h2>
            </div>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="field">
                    <label htmlFor="book-title">Title</label>
                    <input
                        id="book-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. The Lord of the Rings"
                    />
                </div>
                <div className="field">
                    <label htmlFor="book-pages">Pages</label>
                    <input
                        id="book-pages"
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="e.g. 1000"
                    />
                </div>
                <div className="field">
                    <label htmlFor="book-descripcion">Description</label>
                    <textarea
                        id="book-descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="e.g. A fantasy epic..."
                        rows={3}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="btn-primary">
                    Save Book
                </button>
            </form>
        </div>
    )
}
