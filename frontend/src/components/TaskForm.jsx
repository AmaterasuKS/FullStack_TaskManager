import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(value)
    setValue('')
  }

  return (
    <form
      className="add-form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <input
        type="text"
        className="add-form__input"
        placeholder="Название задачи…"
        maxLength={200}
        aria-label="Название задачи"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn btn--primary">
        Добавить
      </button>
    </form>
  )
}
