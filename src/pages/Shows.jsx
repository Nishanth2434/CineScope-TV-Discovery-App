import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchShows, fetchShows } from '../services/tvmaze';
import { useDebounce } from '../hooks/useDebounce';
import { useFavorites } from '../hooks/useFavorites';
import ShowCard from '../components/ShowCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function Shows() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const abortControllerRef = useRef(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    // Update URL when debounced query changes
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }

    const loadData = async () => {
      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        let data;
        if (debouncedQuery.trim() === '') {
          // If no query, just fetch some default shows (e.g., page 1)
          data = await fetchShows(2, { signal: controller.signal });
        } else {
          data = await searchShows(debouncedQuery, { signal: controller.signal });
        }
        setShows(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        // Only set loading to false if this is the active request
        if (abortControllerRef.current === controller) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedQuery, setSearchParams]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Browse Shows</h1>
        
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-dark-paper border border-gray-700 focus:border-primary text-white rounded-lg py-3 pl-10 pr-10 outline-none transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          {query && (
            <button 
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {error && !loading && (
        <ErrorMessage 
          message={error} 
          onRetry={() => setQuery(query + ' ')} // slight change to trigger debounce reload
        />
      )}

      {!error && (
        <>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <LoadingSkeleton count={10} />
            </div>
          ) : shows.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {shows.map((show) => (
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
              title="No results found" 
              message={`We couldn't find any shows matching "${debouncedQuery}". Try a different search term.`} 
            />
          )}
        </>
      )}
    </div>
  );
}
