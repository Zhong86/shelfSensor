import { useEffect, useState } from 'react'; 
import Header from '../components/Header';

export default function GeneralPage() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All'); 
  const [selectedBook, setSelectedBook] = useState(null);
  const [genres, setGenres] = useState([]);

  //GET genres from DB
  useEffect(() => {
    GetGenres().then(data => setGenres(data));
  }, []);

  return (
    <>
      <div className='page-container'>
        <div className='container'>
          <h1 className='h3 mb-4'>Browse Books</h1>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search books or authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-3">
              <select 
                className="form-select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {genres.length === 0 ? (
            <div className="empty-state">
              <h5>No books found</h5>
              <p>Try adjusting your search or filter</p>
            </div>
          ) : (
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                {genres.map(book => (
                  <div className="col" key={book.id}>
                    <BookCard book={book} onClick={() => setSelectedBook(book)} />
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </>
  );
}

async function GetBooks(page = 0, size = 5, {filters}) {
  const params = {
    'page': page, 
    'size': size, 
    'genres': filters.genre || null, 
    'author': filters.author || null, 
    'rating': filters.rating || null
  };
  const url = new URL(import.meta.env.VITE_API_BOOKS);
  url.search = new URLSearchParams(params).toString();

  const books = await fetch(url)
    .then(res => res.json());

  return books;
}

async function GetGenres() {
  const url = new URL(import.meta.env.VITE_API_GENRES);
  const genres = await fetch(url)
    .then(res => res.json());
  return genres;
}
