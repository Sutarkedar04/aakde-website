import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/Field'
import useForm from '../hooks/useForm'
import { api } from '../lib/api'
import { signIn } from '../lib/access'

const empty = { name: '', email: '', password: '', confirm: '' }

function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name = 'Enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.'
  if (f.password.length < 8) e.password = 'Use at least 8 characters.'
  if (f.confirm !== f.password) e.confirm = 'Passwords do not match.'
  return e
}

export default function Register() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const { submit, props, loading, formError } = useForm(empty, validate, async (f) => {
    const { user } = await api('/auth/register', {
      method: 'POST',
      body: { name: f.name, email: f.email, password: f.password },
    })
    signIn(user)
    navigate(state?.from ?? '/', { replace: true })
  })

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join AAKDE in a minute."
      footer={<>Already have an account? <Link to="/login" state={state} className="font-semibold text-main hover:underline">Log in</Link></>}
    >
      {state?.reason === 'demo-limit' && (
        <p className="mb-5 text-sm text-soft">You have used your free demo for this exam. Log in or create an account to keep practising.</p>
      )}
      <form onSubmit={submit} noValidate className="grid gap-5">
        <Field label="Name" autoComplete="name" {...props('name')} />
        <Field label="Email" type="email" autoComplete="email" {...props('email')} />
        <Field label="Password" type="password" autoComplete="new-password" {...props('password')} />
        <Field label="Confirm password" type="password" autoComplete="new-password" {...props('confirm')} />
        {formError && <p role="alert" className="font-medium text-danger">{formError}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  )
}