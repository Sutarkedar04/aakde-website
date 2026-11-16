import SectionHead from './SectionHead'
import Field from './Field'
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

export default function Contact() {
  const { submit, props, sent } = useForm(empty, validate, (f) => console.log('Form data (connect an API here):', f))

  return (
    <section id="contact" data-theme="light" className="relative overflow-hidden bg-paper-mist py-28 text-main">
      <div aria-hidden="true" data-speed="0.18" className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-bright/20 blur-3xl will-change-transform" />
      <div className="wrap relative grid items-start gap-14 lg:grid-cols-[1fr_1.15fr]">
        <SectionHead n="05" label="Contact" title="Tell us what you are working on" mb="mb-0">
          Share a few details and we will get back to you.
        </SectionHead>
        <div data-reveal data-theme="dark" className="rounded-3xl bg-navy p-8 text-main shadow-2xl shadow-black/20 md:p-10">
          <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" {...props('name')} />
            <Field label="Email" type="email" {...props('email')} />
            <Field label="Mobile (optional)" type="tel" {...props('mobile')} />
            <Field label="Subject" {...props('subject')} />
            <Field label="Message" type="textarea" wide {...props('message')} />
            <button type="submit" className="btn btn-primary sm:col-span-2">Send message</button>
            {sent && <p role="status" className="font-medium text-accent sm:col-span-2">Message sent. Thank you for reaching out.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}