import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import ShowCard from '../components/ShowCard';
import EmptyState from '../components/EmptyState';

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/20 p-3 rounded-full text-primary">
          <Heart size={28} className="fill-current" />
        </div>
        <h1 className="text-3xl font-bold">Your Favorites</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((show) => (
            <ShowCard 
              key={show.id} 
              show={show} 
              isFavorite={isFavorite(show.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No favorites yet" 
          message="You haven't saved any shows to your favorites list."
          icon={Heart}
          action={
            <Link 
              to="/shows" 
              className="mt-4 flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Search size={18} />
              Explore Shows
            </Link>
          }
        />
      )}
    </div>
  );
}
