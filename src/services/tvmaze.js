const BASE_URL = 'https://api.tvmaze.com';

async function fetchWithError(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Not found');
      }
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
      throw error;
    }
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchShows(page = 1, options = {}) {
  // TVMaze pagination starts at 0, but often we just want a default list.
  // Using page 0 for some initial shows.
  return fetchWithError(`${BASE_URL}/shows?page=${page - 1}`, options);
}

export async function searchShows(query, options = {}) {
  if (!query) return [];
  const results = await fetchWithError(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`, options);
  // TVMaze search returns [{ score, show }, ...]. We extract the show objects.
  return results.map(item => item.show);
}

export async function fetchShowDetails(id, options = {}) {
  return fetchWithError(`${BASE_URL}/shows/${id}?embed=episodes`, options);
}

export async function fetchShowEpisodes(id, options = {}) {
  return fetchWithError(`${BASE_URL}/shows/${id}/episodes`, options);
}
