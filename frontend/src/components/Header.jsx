import { Link, NavLink } from 'react-router-dom'

export default function Header({ taskCount, username, onLogout }) {
  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/" className="header__brand">
          <span>Task</span> Manager
        </Link>
      </h1>
      <nav className="header__nav" aria-label="Основная навигация">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-link${isActive ? ' nav-link--active' : ''}`
          }
        >
          Доска
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            `nav-link${isActive ? ' nav-link--active' : ''}`
          }
        >
          Статистика
        </NavLink>
      </nav>
      <div className="header__aside">
        {username ? (
          <span className="header__user" title={username}>
            {username}
          </span>
        ) : null}
        <p className="header__counter">
          Всего задач: <strong>{taskCount}</strong>
        </p>
        {onLogout ? (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onLogout}
          >
            Выйти
          </button>
        ) : null}
      </div>
    </header>
  )
}
