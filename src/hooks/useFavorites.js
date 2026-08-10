import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'cinescope_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
      // Handle corrupted state gracefully
      localStorage.removeItem(FAVORITES_KEY);
    }
  }, []);

  const toggleFavorite = (show) => {
    setFavorites((prevFavorites) => {
      let newFavorites;
      const exists = prevFavorites.some((fav) => fav.id === show.id);
      
      if (exists) {
        newFavorites = prevFavorites.filter((fav) => fav.id !== show.id);
      } else {
        newFavorites = [...prevFavorites, show];
      }
      
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage', error);
      }
      
      return newFavorites;
    });
  };

  const isFavorite = (showId) => {
    return favorites.some((fav) => fav.id === showId);
  };

  return { favorites, toggleFavorite, isFavorite };
}
