import { useState } from 'react'

export default function useForm(empty, validate, onValid) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const change = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setSent(false)
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      onValid?.(form)
      setSent(true)
      setForm(empty)
    }
  }

  // Spread onto <Field {...props('email')} />
  const props = (name) => ({ name, value: form[name], onChange: change, error: errors[name] })

  return { submit, props, sent }
}