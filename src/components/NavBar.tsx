import { NavLink } from 'react-router-dom'
import { allPages } from '../lib/pages'

export function NavBar() {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        {allPages.map((page) => (
          <li key={page.path}>
            <NavLink
              to={page.path}
              end={page.path === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {page.navLabel}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
