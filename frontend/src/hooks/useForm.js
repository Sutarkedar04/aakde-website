import { useState } from 'react'

export default function useForm(empty, validate, onValid) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const change = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setSent(false)
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    setFormError('')
    if (Object.keys(found).length) return

    setLoading(true)
    try {
      await onValid?.(form)
      setSent(true)
      setForm(empty)
    } catch (err) {
      setErrors(err.fieldErrors ?? {})
      setFormError(err.fieldErrors ? '' : err.message)
    } finally {
      setLoading(false)
    }
  }

  const props = (name) => ({ name, value: form[name], onChange: change, error: errors[name] })

  return { submit, props, sent, loading, formError }
}