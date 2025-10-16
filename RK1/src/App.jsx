import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Books from './pages/Books.jsx'
import AddSBook from './pages/AddSBook.jsx'

function NotFound() {
  return (
    <div className="container">
      <h2>404 — Page Not Found</h2>
      <p className="muted">The page you are looking for does not exist.</p>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <header>
        <nav className="container nav">
          <NavLink to="/books" className={({ isActive }) => isActive ? 'active' : undefined}>Books</NavLink>
          <NavLink to="/add-book" className={({ isActive }) => isActive ? 'active' : undefined}>Add Book</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/add-book" element={<AddSBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}




