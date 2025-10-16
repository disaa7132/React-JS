import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'minilibrary_books'

const schema = Yup.object({
  title: Yup.string().required('Title is required').min(2, 'Min 2 characters'),
  author: Yup.string().required('Author is required'),
  genre: Yup.string().oneOf(['fiction', 'nonfiction', 'tech']).required('Genre is required'),
  rating: Yup.number().min(0, 'Min 0').max(5, 'Max 5').required('Rating is required')
})

export default function AddSBook() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <h2 style={{ marginTop: 0 }}>Add Book</h2>
      <Formik
        initialValues={{ title: '', author: '', genre: 'fiction', rating: 0 }}
        validationSchema={schema}
        onSubmit={(values) => {
          const newBook = {
            id: Date.now(),
            title: values.title.trim(),
            author: values.author.trim(),
            genre: values.genre,
            rating: Number(values.rating)
          }
          try {
            const raw = localStorage.getItem(STORAGE_KEY)
            const current = raw ? JSON.parse(raw) : []
            const next = Array.isArray(current) ? [...current, newBook] : [newBook]
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
          } catch (_) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([newBook]))
          }
          navigate('/books')
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="field">
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" placeholder="The Pragmatic Programmer" />
              <div className="error"><ErrorMessage name="title" /></div>
            </div>

            <div className="field">
              <label htmlFor="author">Author</label>
              <Field id="author" name="author" placeholder="Andrew Hunt" />
              <div className="error"><ErrorMessage name="author" /></div>
            </div>

            <div className="field">
              <label htmlFor="genre">Genre</label>
              <Field as="select" id="genre" name="genre">
                <option value="fiction">Fiction</option>
                <option value="nonfiction">Nonfiction</option>
                <option value="tech">Tech</option>
              </Field>
              <div className="error"><ErrorMessage name="genre" /></div>
            </div>

            <div className="field">
              <label htmlFor="rating">Rating (0-5)</label>
              <Field id="rating" name="rating" type="number" step="0.1" min="0" max="5" />
              <div className="error"><ErrorMessage name="rating" /></div>
            </div>

            <div className="actions">
              <button type="submit" disabled={isSubmitting}>Save</button>
              <button type="button" className="danger" onClick={() => navigate('/books')}>Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}




