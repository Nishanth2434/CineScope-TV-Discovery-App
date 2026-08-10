import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Star, Heart, ArrowLeft, Calendar, Clock, Globe, Info, Tv } from 'lucide-react';
import { fetchShowDetails } from '../services/tvmaze';
import { useFavorites } from '../hooks/useFavorites';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadDetails = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchShowDetails(id, { signal: controller.signal });
        setShow(data);
        document.title = `${data.name} | CineScope`;
      } catch (err) {
        if (err.name !== 'AbortError') {
          if (err.message === 'Not found') {
            setError('404');
          } else {
            setError(err.message);
          }
        }
      } finally {
        if (abortControllerRef.current === controller) {
          setLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      document.title = 'CineScope';
    };
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 bg-gray-800 w-32 rounded mb-6"></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 aspect-[210/295] bg-gray-800 rounded-xl"></div>
          <div className="w-full md:w-2/3 space-y-4">
            <div className="h-12 bg-gray-800 w-3/4 rounded"></div>
            <div className="flex gap-4">
              <div className="h-6 bg-gray-800 w-24 rounded"></div>
              <div className="h-6 bg-gray-800 w-24 rounded"></div>
            </div>
            <div className="h-40 bg-gray-800 w-full rounded mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error === '404') {
    return (
      <EmptyState 
        title="Show Not Found" 
        message="The TV show you are looking for does not exist or has been removed."
        action={
          <button onClick={() => navigate(-1)} className="bg-primary px-6 py-2 rounded-lg text-white font-medium mt-4">
            Go Back
          </button>
        }
      />
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  if (!show) return null;

  const image = show.image?.original || show.image?.medium || 'https://via.placeholder.com/680x1000?text=No+Image';
  const isFav = isFavorite(show.id);
  const episodes = show._embedded?.episodes || [];

  return (
    <div className="space-y-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-6"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Left Column - Image */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="sticky top-8">
            <img 
              src={image} 
              alt={show.name} 
              className="w-full rounded-2xl shadow-2xl border border-gray-800 object-cover"
            />
            <button
              onClick={() => toggleFavorite(show)}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
                isFav ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/30'
              }`}
            >
              <Heart size={24} className={isFav ? 'fill-red-500 text-red-500' : ''} />
              {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{show.name}</h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base text-gray-300">
            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full">
              <Star size={16} className="fill-current" />
              <span className="font-bold">{show.rating?.average || 'N/A'}</span>
            </div>
            
            {show.premiered && (
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-500" />
                {new Date(show.premiered).getFullYear()}
              </div>
            )}
            
            {show.runtime && (
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-500" />
                {show.runtime} min
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Info size={18} className="text-gray-500" />
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                show.status === 'Running' ? 'bg-green-900/50 text-green-400 border border-green-900' : 'bg-gray-800 text-gray-300'
              }`}>
                {show.status}
              </span>
            </div>
          </div>

          {show.genres && show.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {show.genres.map(genre => (
                <span key={genre} className="bg-gray-800 text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium">
                  {genre}
                </span>
              ))}
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            {show.summary ? (
              <div 
                className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(show.summary) }} 
              />
            ) : (
              <p className="text-gray-400 italic">No summary available for this show.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12 p-6 bg-dark-paper rounded-2xl border border-gray-800">
            <div>
              <span className="block text-gray-500 text-sm mb-1">Language</span>
              <span className="font-medium">{show.language || 'Unknown'}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm mb-1">Network</span>
              <span className="font-medium">{show.network?.name || show.webChannel?.name || 'Unknown'}</span>
            </div>
            {show.officialSite && (
              <div className="col-span-2 pt-4 mt-4 border-t border-gray-800">
                <a 
                  href={show.officialSite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
                >
                  <Globe size={18} />
                  Visit Official Site
                </a>
              </div>
            )}
          </div>

          {/* Episodes Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-primary/20 text-primary p-2 rounded-lg">
                <Tv size={24} />
              </span>
              Episodes ({episodes.length})
            </h2>
            
            {episodes.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {episodes.slice().reverse().map((episode) => (
                  <div key={episode.id} className="bg-dark-paper p-4 rounded-xl border border-gray-800 flex flex-col sm:flex-row gap-4 group hover:border-gray-600 transition-colors">
                    {episode.image?.medium && (
                      <div className="sm:w-48 shrink-0">
                        <img 
                          src={episode.image.medium} 
                          alt={episode.name}
                          loading="lazy"
                          className="w-full h-auto rounded-lg object-cover aspect-video"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg">{episode.name}</h3>
                        <span className="text-primary font-mono bg-primary/10 px-2 py-1 rounded text-sm font-bold">
                          S{String(episode.season).padStart(2, '0')}E{String(episode.number).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        {episode.airdate && <span>Aired: {episode.airdate}</span>}
                        {episode.runtime && <span>{episode.runtime} min</span>}
                      </div>
                      {episode.summary ? (
                        <div 
                          className="text-gray-400 text-sm line-clamp-2 group-hover:line-clamp-none transition-all"
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(episode.summary) }}
                        />
                      ) : (
                        <p className="text-gray-600 text-sm italic">No description available.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-dark-paper p-8 rounded-xl text-center border border-gray-800">
                <p className="text-gray-400">No episode data available for this show.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
