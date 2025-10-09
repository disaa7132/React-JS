import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './course-form.css'

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  phone: '',
  course: '',
  gender: '',
  dateOfBirth: '',
  education: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
}

const ValidationSchema = Yup.object({
  fullName: Yup.string().trim().required('Full name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password must be at least 6 characters'),
  course: Yup.string().required('Please select a course'),
  gender: Yup.string().required('Please select gender'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  city: Yup.string().trim().required('City is required'),
  country: Yup.string().required('Country is required'),
  phone: Yup.string().nullable(),
  education: Yup.string().nullable(),
  address: Yup.string().nullable(),
  state: Yup.string().nullable(),
  zip: Yup.string()
    .matches(/^\d*$/, 'Zip Code must contain only digits')
    .nullable(),
})

export default function CourseForm() {
  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Course Application</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
            // resetForm() // keep values after submit; uncomment to clear
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="form">
              <div className="row">
                <div className="col">
                  <Field name="fullName" type="text" placeholder="Full name" className={`input ${errors.fullName && touched.fullName ? 'error' : ''}`} />
                  {errors.fullName && touched.fullName && (
                    <div className="error-text">{errors.fullName}</div>
                  )}
                </div>
              </div>

              <div className="row two">
                <div className="col">
                  <Field name="email" type="email" placeholder="Email" className={`input ${errors.email && touched.email ? 'error' : ''}`} />
                  {errors.email && touched.email && (
                    <div className="error-text">{errors.email}</div>
                  )}
                </div>
                <div className="col">
                  <Field name="phone" type="tel" placeholder="Phone" className="input" />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <Field name="password" type="password" placeholder="Password" className={`input ${errors.password && touched.password ? 'error' : ''}`} />
                  {errors.password && touched.password && (
                    <div className="error-text">{errors.password}</div>
                  )}
                </div>
              </div>

              <div className="row">
                <label className="label">Which course are you applying for?</label>
                <div className="radio-group">
                  <label className="radio">
                    <Field type="radio" name="course" value="Course A" /> Course A
                  </label>
                  <label className="radio">
                    <Field type="radio" name="course" value="Course B" /> Course B
                  </label>
                  <label className="radio">
                    <Field type="radio" name="course" value="Course C" /> Course C
                  </label>
                </div>
                {errors.course && touched.course && (
                  <div className="error-text">{errors.course}</div>
                )}
              </div>

              <div className="row two center">
                <div className="col">
                  <label className="label">Date of birth</label>
                  <Field name="dateOfBirth" type="date" className={`input ${errors.dateOfBirth && touched.dateOfBirth ? 'error' : ''}`} />
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <div className="error-text">{errors.dateOfBirth}</div>
                  )}
                </div>
                <div className="col">
                  <label className="label">Gender</label>
                  <div className="radio-group">
                    <label className="radio">
                      <Field type="radio" name="gender" value="Male" /> MALE
                    </label>
                    <label className="radio">
                      <Field type="radio" name="gender" value="Female" /> FEMALE
                    </label>
                  </div>
                  {errors.gender && touched.gender && (
                    <div className="error-text">{errors.gender}</div>
                  )}
                </div>
              </div>

              <div className="row">
                <label className="label">Education</label>
                <Field as="select" name="education" className="input">
                  <option value="">School</option>
                  <option value="College">College</option>
                  <option value="University">University</option>
                </Field>
              </div>

              <div className="row">
                <Field as="textarea" name="address" placeholder="Address" className="input textarea" />
              </div>

              <div className="row two">
                <div className="col">
                  <Field name="city" type="text" placeholder="City" className={`input ${errors.city && touched.city ? 'error' : ''}`} />
                  {errors.city && touched.city && (
                    <div className="error-text">{errors.city}</div>
                  )}
                </div>
                <div className="col">
                  <Field name="state" type="text" placeholder="State" className="input" />
                </div>
              </div>

              <div className="row two">
                <div className="col">
                  <Field name="zip" type="text" placeholder="Zip Code" className={`input ${errors.zip && touched.zip ? 'error' : ''}`} />
                  {errors.zip && touched.zip && (
                    <div className="error-text">{errors.zip}</div>
                  )}
                </div>
                <div className="col">
                  <Field as="select" name="country" className={`input ${errors.country && touched.country ? 'error' : ''}`}>
                    <option value="">Country</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Germany">Germany</option>
                  </Field>
                  {errors.country && touched.country && (
                    <div className="error-text">{errors.country}</div>
                  )}
                </div>
              </div>

              <button type="submit" className="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}


