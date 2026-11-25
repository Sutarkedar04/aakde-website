import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Field from '../components/Field'
import useForm from '../hooks/useForm'

const empty = { name: '', email: '', mobile: '', subject: '', message: '' }

function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name = 'Enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.'
  if (f.mobile && !/^[0-9+\-\s]{7,15}$/.test(f.mobile)) e.mobile = 'Enter a valid mobile number.'
  if (f.message.trim().length < 10) e.message = 'Write at least 10 characters.'
  return e
}

export default function ContactPage() {
  const { submit, props, sent } = useForm(empty, validate, (f) => console.log('Form data (connect an API here):', f))

  return (
    <AuthLayout
      title="Contact us"
      subtitle="Share a few details and we will get back to you."
      footer={<Link to="/" className="font-semibold text-accent hover:underline">Back to home</Link>}
    >
      <form onSubmit={submit} noValidate className="grid gap-5">
        <Field label="Name" autoComplete="name" {...props('name')} />
        <Field label="Email" type="email" autoComplete="email" {...props('email')} />
        <Field label="Mobile (optional)" type="tel" autoComplete="tel" {...props('mobile')} />
        <Field label="Subject" {...props('subject')} />
        <Field label="Message" type="textarea" {...props('message')} />
        <button type="submit" className="btn btn-primary">Send message</button>
        {sent && <p role="status" className="font-medium text-success">Message sent. Thank you for reaching out.</p>}
      </form>
    </AuthLayout>
  )
}