let accessToken = null; 

export const setToken = (token) => accessToken = token; 
export const clearToken = () => accessToken = null; 

const authFetch = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options, 
    headers: {
      'Authorization': `Bearer ${accessToken}`, 
      'Content-Type': 'application/json'
    }
  });
  if(res.status === 204) return null;
  
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

export const api = {
  //books
  getBooks: (params) => authFetch(`${import.meta.env.VITE_API_BOOKS}?${new URLSearchParams(params)}`),
  getBookByIsbn: (isbn) => authFetch(`${import.meta.env.VITE_API_BOOKS}/${isbn}`),
  getGenres: () => authFetch(import.meta.env.VITE_API_GENRES),

  //reviews
  getReviews: (bookId) => authFetch(`${import.meta.env.VITE_API_REVIEWS}/${bookId}`),
  addReview: (body) => authFetch(import.meta.env.VITE_API_REVIEWS, 
    { method: 'POST', body: JSON.stringify(body) }),

  //entry Ids
  getSavedIds: () => authFetch(`${import.meta.env.VITE_API_ENTRIES}/saved-ids`),

  //entries
  getEntries: (params) => authFetch(`${import.meta.env.VITE_API_ENTRIES}?${new URLSearchParams(params)}`),
  addEntry: (body) => authFetch(import.meta.env.VITE_API_ENTRIES, 
    { method: 'POST', body: JSON.stringify(body) }),
  updateEntry: (body) => authFetch(import.meta.env.VITE_API_ENTRIES,
    { method: 'PUT', body: JSON.stringify(body) }),
  deleteEntry: (bookId) => authFetch(`${import.meta.env.VITE_API_ENTRIES}/${bookId}`, 
    { method: 'DELETE' }),
};
