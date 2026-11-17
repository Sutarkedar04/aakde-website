import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/Field'
import useForm from '../hooks/useForm'

const empty = { email: '', password: '' }

function validate(f) {
  const e = {}
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.'
  if (!f.password) e.password = 'Enter your password.'
  return e
}

export default function Login() {
  const { submit, props, sent } = useForm(empty, validate, (f) => console.log('Login (connect an API here):', { email: f.email }))

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your AAKDE account."
      footer={<>New to AAKDE? <Link to="/register" className="font-semibold text-main hover:underline">Create an account</Link></>}
    >
      <form onSubmit={submit} noValidate className="grid gap-5">
        <Field label="Email" type="email" autoComplete="email" {...props('email')} />
        <Field label="Password" type="password" autoComplete="current-password" {...props('password')} />
        <button type="submit" className="btn btn-primary">Log in</button>
        {sent && <p role="status" className="font-medium text-success">Logged in. (Connect an API to make this real.)</p>}
      </form>
    </AuthLayout>
  )
}