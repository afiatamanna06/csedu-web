import { Link } from "@tanstack/react-router";

export default function About() {
  return (
    <div className="p-4">
      <h1>About Us</h1>
      <p>This is the About page.</p>
      <Link 
        to="/profile" 
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Go to Profile
      </Link>
    </div>
  )
}
