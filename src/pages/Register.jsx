import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/Field'
import useForm from '../hooks/useForm'

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
  const { submit, props, sent } = useForm(empty, validate, (f) => console.log('Register (connect an API here):', { name: f.name, email: f.email }))

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join AAKDE in a minute."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-main hover:underline">Log in</Link></>}
    >
      <form onSubmit={submit} noValidate className="grid gap-5">
        <Field label="Name" autoComplete="name" {...props('name')} />
        <Field label="Email" type="email" autoComplete="email" {...props('email')} />
        <Field label="Password" type="password" autoComplete="new-password" {...props('password')} />
        <Field label="Confirm password" type="password" autoComplete="new-password" {...props('confirm')} />
        <button type="submit" className="btn btn-primary">Create account</button>
        {sent && <p role="status" className="font-medium text-accent">Account created. (Connect an API to make this real.)</p>}
      </form>
    </AuthLayout>
  )
}