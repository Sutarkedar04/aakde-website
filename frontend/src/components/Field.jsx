const inputClass =
  'rounded-[10px] border-[1.5px] border-main/25 bg-main/5 px-3.5 py-3 text-main focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/25 aria-[invalid=true]:border-danger'

export default function Field({ name, label, type = 'text', wide, value, onChange, error, autoComplete }) {
  const Tag = type === 'textarea' ? 'textarea' : 'input'
  return (
    <div className={`flex flex-col gap-1.5 ${wide ? 'sm:col-span-2' : ''}`}>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <Tag
        id={name}
        name={name}
        type={type === 'textarea' ? undefined : type}
        rows={type === 'textarea' ? 5 : undefined}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      {error && <span id={`${name}-error`} className="text-sm text-danger">{error}</span>}
    </div>
  )
}