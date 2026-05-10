import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [value, setValue] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await onAdd(value)
      setValue('')
    } catch {
      /* ошибка обрабатывается в useTasks */
    }
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
