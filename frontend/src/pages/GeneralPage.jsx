import { useEffect, useState } from 'react'; 
import { api } from '../api.js';
import BookCard from '../components/BookCard'; 
import BookModal from '../components/BookModal';

export default function GeneralPage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(); 
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  //GET genres from DB
  useEffect(() => {
    setLoading(true);
    Promise.all([GetGenres(), GetBooks()])
      .then(([genresData, booksData]) => {
        setGenres(genresData);
        setBooks(booksData);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if(!search && !filters) return; 

    setLoading(true);
    const books = await GetBooks(filters)
      .finally(() => setLoading(false));
    setBooks(books);
  };

  return (
    <>
      <div className='page-container'>
        <div className='container'>
          <h1 className='h3 mb-4'>Browse Books</h1>

          <div className="w-100 mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="row g-3 mb-4">
            <div className='col-4'>
              <input
                type='text'
                className='form-control'
                placeholder='Author'
                onChange={(e) => setFilters(f => ({ ...f, author: e.target.value || null }))}/>
            </div>

            <div className='col-3'>
              <select 
                className='form-select'
                onChange={(e) => setFilters(f => ({ ...f, genre: e.target.value || null }))}>
                <option value=''>Genres</option>
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className='col-2'>
              <button type="submit" className='btn btn-cozy' 
                onClick={handleSearch}
              >Search</button>
            </div>
          </div>


          { loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status" />
            </div>
          ) : books == null || books.length === 0 ? (
              <div className="empty-state">
                <h5>No books found</h5>
                <p>Try adjusting your search or filter</p>
              </div>
            ) : (
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                  {books.map(book => (
                    <div className="col" key={book.isbn}>
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

async function GetBooks(filters = {}, page = 0, size = 9) {
  const params = {
    page: page, 
    size: size, 
    genre: filters.genre?.toLowerCase() || null, 
    author: filters.author?.toLowerCase() || null, 
  };
  console.log(params);
  const res = await api.getBooks(params);
  console.log(res);
  if(res != null) return res.content;
  return [];
}

async function GetGenres() {
  const res = await api.getGenres();
  return res;
}
