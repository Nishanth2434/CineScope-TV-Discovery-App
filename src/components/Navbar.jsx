import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-dark-paper border-b border-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors">
          <Film size={28} />
          <span className="text-xl font-bold tracking-wide text-light">CineScope</span>
        </Link>
        <div className="flex gap-6">
          <Link to="/shows" className="hover:text-primary transition-colors">Browse</Link>
          <Link to="/favorites" className="hover:text-primary transition-colors">Favorites</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
        </div>
      </div>
    </nav>
  );
}
