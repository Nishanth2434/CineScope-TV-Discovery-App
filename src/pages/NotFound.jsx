import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">Oops! This page doesn't exist.</p>
      <Link to="/" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
