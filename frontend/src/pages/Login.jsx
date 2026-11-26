import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/Field'
import useForm from '../hooks/useForm'
import { api } from '../lib/api'
import { signIn } from '../lib/access' // the file that holds signIn / isLoggedIn

const empty = { email: '', password: '' }

function validate(f) {
  const e = {}
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.'
  if (!f.password) e.password = 'Enter your password.'
  return e
}

export default function Login() {
  const navigate = useNavigate()

  const { submit, props, loading, formError } = useForm(empty, validate, async (f) => {
    const { user } = await api('/auth/login', {
      method: 'POST',
      body: { email: f.email, password: f.password },
    })
    signIn(user)
    navigate('/')
  })

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your AAKDE account."
      footer={<>New to AAKDE? <Link to="/register" className="font-semibold text-main hover:underline">Create an account</Link></>}
    >
      <form onSubmit={submit} noValidate className="grid gap-5">
        <Field label="Email" type="email" autoComplete="email" {...props('email')} />
        <Field label="Password" type="password" autoComplete="current-password" {...props('password')} />
        {formError && <p role="alert" className="font-medium text-red-600">{formError}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  )
}