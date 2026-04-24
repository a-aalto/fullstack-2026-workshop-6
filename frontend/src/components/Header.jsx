import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">WS06 React</Link>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about" end>About</NavLink>
          <NavLink to="/contact" end>Contact</NavLink>
          <NavLink to="/posts/new" end>New Post</NavLink>
          <NavLink to="/blog">Blog</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
