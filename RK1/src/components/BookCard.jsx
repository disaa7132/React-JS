import React from 'react'

function BookCardBase({ book, onDelete }) {
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: 0 }}>{book.title}</h3>
          <div className="muted">by {book.author}</div>
        </div>
        <button className="danger" onClick={() => onDelete(book.id)}>Delete</button>
      </div>
      <div className="space" />
      <div className="row">
        <span className="muted">Genre:</span>
        <strong>{book.genre}</strong>
      </div>
      <div className="row">
        <span className="muted">Rating:</span>
        <strong>{book.rating}</strong>
      </div>
    </div>
  )
}

const BookCard = React.memo(BookCardBase)
export default BookCard




