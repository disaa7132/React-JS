import React from 'react'
import BookCard from '../components/BookCard.jsx'

const STORAGE_KEY = 'minilibrary_books'

export default function Books() {
  const [books, setBooks] = React.useState([])
  const [query, setQuery] = React.useState('')
  const [genre, setGenre] = React.useState('all')

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setBooks(parsed)
      }
    } catch (_) {
      // ignore corrupted storage
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  }, [books])

  const handleDelete = React.useCallback((id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return books.filter((b) => {
      const matchesTitle = q === '' || b.title.toLowerCase().includes(q)
      const matchesGenre = genre === 'all' || b.genre === genre
      return matchesTitle && matchesGenre
    })
  }, [books, query, genre])

  return (
    <div className="container">
      <h2 style={{ marginTop: 0 }}>Books</h2>
      <div className="controls">
        <input
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Nonfiction</option>
          <option value="tech">Tech</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="muted">No books found. Add some via "Add Book".</p>
      ) : (
        <div className="grid">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}




