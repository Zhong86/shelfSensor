import { useEffect, useState } from 'react'; 
import { api } from '../api.js';
import BookCard from '../components/BookCard'; 
import BookModal from '../components/BookModal';
import { useApp } from '../context/AppContext';

export default function GeneralPage() {
  const { user, genres } = useApp();
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({}); 
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [savedBookIds, setSavedBookIds] = useState(new Set());

  useEffect(() => {
    setLoading(true);
    GetBooks().then(d => {
      setBooks(d.content);
      setTotalPages(d.totalPages);
    }).catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!user) return;
    GetSavedBookIds().then(ids => setSavedBookIds(new Set(ids)));

  }, [user]); 

  useEffect(() => {
    GetBooks(filters, page).then(b => setBooks(b.content));
  }, [page]);

  useEffect(() => {
    if(!selectedBook) return; 
    GetReviews(selectedBook.id).then(data => { 
      setReviews(data);
    });
  }, [selectedBook]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if(!filters) return; 

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
              onChange={(e) => setFilters(f => ({ ...f, title: e.target.value || null }))}
            />
          </div>
          <div className="row g-3 mb-4">
            <div className='col-4 col-md-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Author'
                onChange={(e) => setFilters(f => ({ ...f, author: e.target.value || null }))}/>
            </div>

            <div className='col-4 col-md-2'>
              <select 
                className='form-select'
                onChange={(e) => setFilters(f => ({ ...f, genre: e.target.value || null }))}>
                <option value=''>All Genres</option>
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className='col-2 col-md-1'>
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
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
          <button 
            className="btn btn-outline-secondary btn-sm"
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
          >
            &laquo;
          </button>

          <span className="text-muted small">Page {page + 1} of {totalPages}</span>

          <button 
            className="btn btn-outline-secondary btn-sm"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            &raquo;
          </button>
        </div>
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} reviews={reviews} savedIds={savedBookIds} setSavedBookIds={setSavedBookIds} onClose={() => setSelectedBook(null)} />
      )}
    </>
  );
}

async function GetBooks(filters = {}, page = 0, size = 9) {
  const params = {
    page: page, 
    size: size, 
  };

  if(filters.title && filters.title != null)
    params.title = filters.title.toLowerCase();
  if(filters.genre && filters.genre != null)
    params.genre = filters.genre.toLowerCase();
  if(filters.author && filters.author.toLowerCase())
    params.author = filters.author.toLowerCase();

  const res = await api.getBooks(params);
  return res;
}

async function GetReviews(bookId) {
  const res = await api.getReviews(bookId);
  return res.content;
}

async function GetSavedBookIds() {
  const res = await api.getSavedIds();
  console.log(res);
  return res;
}
