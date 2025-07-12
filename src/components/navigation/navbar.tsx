import { Link } from '@tanstack/react-router'

export default function Navbar() {
  return (
    <nav className="p-2 w-full flex gap-4 bg-gray-100">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/programs" className="[&.active]:font-bold">
        Programs
      </Link>
      <Link to="/contact" className="[&.active]:font-bold">
        Contact
      </Link>
    </nav>
  )
}
