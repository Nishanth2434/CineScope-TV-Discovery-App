import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';

export default function ShowCard({ show, isFavorite, onToggleFavorite }) {
  const image = show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
  const rating = show.rating?.average || '-';

  return (
    <div className="bg-dark-paper rounded-xl overflow-hidden shadow-lg border border-gray-800 flex flex-col h-full transition-transform hover:-translate-y-1 hover:shadow-primary/20">
      <div className="relative aspect-[210/295] w-full bg-gray-800">
        <img
          src={image}
          alt={show.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onToggleFavorite) onToggleFavorite(show);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors backdrop-blur-sm group"
          aria-label={`${isFavorite ? 'Remove' : 'Add'} ${show.name} to favorites`}
        >
          <Heart size={20} className={`transition-colors ${isFavorite ? 'fill-primary text-primary' : 'text-white group-hover:text-primary'}`} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-1">{show.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 shrink-0">
            <Star size={14} className="fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-1">
          {show.genres?.join(', ') || 'No genres'}
        </p>
        <Link
          to={`/shows/${show.id}`}
          className="mt-auto block w-full text-center bg-gray-800 hover:bg-primary text-white py-2 rounded-lg font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
