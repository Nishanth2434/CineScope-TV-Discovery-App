import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Tv } from 'lucide-react';
import { fetchShows } from '../services/tvmaze';
import { useFavorites } from '../hooks/useFavorites';
import ShowCard from '../components/ShowCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function Home() {
  const [featuredShows, setFeaturedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const loadFeaturedShows = async (controller) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchShows(1, { signal: controller.signal });
      // TVMaze returns ~250 shows per page. We just want a few for the hero section.
      setFeaturedShows(data.slice(0, 12));
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadFeaturedShows(controller);
    return () => controller.abort();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shows?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 md:py-24 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl border border-primary/10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
          Discover your next <span className="text-primary bg-clip-text">favorite show.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Explore thousands of TV shows, read episode summaries, and build your ultimate watchlist with CineScope.
        </p>
        
        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto relative group">
          <input
            type="text"
            placeholder="Search for shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-paper border border-gray-700 focus:border-primary text-white rounded-full py-4 pl-12 pr-6 outline-none transition-all shadow-lg focus:shadow-primary/20 text-lg"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </section>

      {/* Featured Shows Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Tv className="text-primary" />
            Featured Shows
          </h2>
          <Link to="/shows" className="text-primary hover:text-primary-hover font-medium transition-colors">
            Explore All &rarr;
          </Link>
        </div>

        {error && !loading && (
          <ErrorMessage 
            message={error} 
            onRetry={() => {
              const controller = new AbortController();
              loadFeaturedShows(controller);
            }} 
          />
        )}

        {!error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {loading ? (
              <LoadingSkeleton count={12} />
            ) : featuredShows.length > 0 ? (
              featuredShows.map((show) => (
                <ShowCard 
                  key={show.id} 
                  show={show} 
                  isFavorite={isFavorite(show.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState title="No featured shows" message="Check back later for trending content." />
              </div>
            )}
          </div>
        )}
      </section>
      
      {/* Call to Action */}
      <section className="bg-dark-paper rounded-2xl p-8 md:p-12 text-center border border-gray-800">
        <h2 className="text-3xl font-bold mb-4">Curate Your Watchlist</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Save your favorite shows in one place so you never forget what you want to watch next.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/shows" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20">
            Browse Shows
          </Link>
          <Link to="/favorites" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors border border-gray-700">
            View Favorites
          </Link>
        </div>
      </section>
    </div>
  );
}
