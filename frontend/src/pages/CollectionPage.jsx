import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';

export default function CollectionPage() {
  const { user, genres } = useApp();
  const [entries, setEntries] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); 
  const [editStatus, setEditStatus] = useState('');
  const [editFavorite, setEditFavorite] = useState(false);
  const [editNote, setEditNote] = useState('');
  const [filters, setFilters] = useState({}); 
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if(user)
      GetEntries().then(data => { 
        setEntries(data.content);
        setTotalPages(data.totalPages);
      });
  }, [user]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if(!filters) return; 

    const data = await GetEntries(filters);
    setEntries(data.content);
    setTotalPages(data.totalPages);
  };


  const handleOpen = (entry) => {
    if(selectedBook == entry.book) {
      setSelectedBook(null);
      return;
    }

    setSelectedBook(entry.book);
    setEditStatus(entry.status);
    setEditFavorite(entry.favorite);
    setEditNote(entry.notes || '');
  };

  const handleUpdate = async (e) => {
    e.stopPropagation();

    await api.updateEntry({ 
      bookId: selectedBook.id, 
      status: editStatus, 
      favorite: editFavorite, 
      notes: editNote
    });

    setEntries(prev => prev.map(e => 
      e.book.id === selectedBook.id 
        ? { ...e, status: editStatus, favorite: editFavorite, notes: editNote }
        : e
    ));
    setSelectedBook(null);
  };

  const handleDelete = async (bookId) => {
    await api.deleteEntry(bookId);
    setEntries(prev => prev.filter(e => e.book.id !== bookId));
    setSelectedBook(null);
  };

  if(!user) {
    return (
      <>
        <div className="page-container">
          <div className="container">
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--cozy-tan)' }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <h5 className="mt-3">Please log in</h5>
              <p>You need to be logged in to access your personal library</p>
              <Link to="/login" className="btn btn-cozy">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }


  return (
    <>
      <div className="page-container">
        <div className="container">
          <div className="w-100 mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Search your saved books..."
              onChange={(e) => setFilters(f => ({ ...f, title: e.target.value || null }))}
            />
          </div>
          <div className='row mb-3 gy-1'>
            <div className='col-4 col-md-2'>
              <select 
                className='form-select'
                onChange={(e) => setFilters(f => ({ ...f, genre: e.target.value || null }))}>
                <option value=''>All Genres</option>
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className='col-4 col-md-2'>
              <select 
                className='form-select'
                onChange={(e) => setFilters(f => ({ ...f, status: e.target.value || null }))}>
                <option value=''>Any Status</option>
                <option value='READING'>Reading</option>
                <option value='READ_LATER'>Read Later</option>
                <option value='COMPLETED'>Completed</option>
              </select>
            </div>
            <div className='col-4 col-md-2'>
              <select 
                className='form-select'
                onChange={(e) => setFilters(f => ({ ...f, favorite: e.target.value || null }))}>
                <option value=''>Favorite?</option>
                <option value='true'>Favorites</option>
                <option value='false'>Not Favorite</option>
              </select>
            </div>
            <div className='col-2 col-md-1'>
              <button type="submit" className='btn btn-cozy' 
                onClick={handleSearch}
              >Search</button>
            </div>
          </div>


          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">My Library</h1>
            <span className="badge bg-secondary">{entries.length} books</span>
          </div>

          {entries.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--cozy-tan)' }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <h5 className="mt-3">No saved books yet</h5>
              <p className='mb-3'>Browse our collection and save books to your library</p>
              <Link to="/" className="btn btn-cozy">
                Browse Books
              </Link>
            </div>
          ) : (
              <>
                <div className="row">
                  {entries.map(entry => (
                    <div className="col-12 mb-4" key={entry.book.id}>
                      <div className="card card-cozy"
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpen(entry);
                        }
                        }>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-3 col-md-2">
                              <img 
                                src={`https://covers.openlibrary.org/b/isbn/${entry.book.isbn}-L.jpg`}
                                alt={entry.book.title}
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="col-9 col-md-10">
                              <div className="d-flex justify-content-between">
                                <div className='d-flex gap-3 align-items-center'>
                                  <h5 className="mb-0">{entry.book.title}</h5>
                                  {entry.book.authors.map(
                                    author => <p className="text-muted small mb-0" key={author.name}>{author.name}</p>)}
                                </div>
                                <p className="text-muted mb-1" 
                                  style={{fontStyle:"italic"}}>{entry.status}</p>

                              </div>
                              <div className='d-flex flex-wrap gap-1 mt-1'>
                                {entry.book.genres.map(
                                  genre => <span className="badge badge-genre" key={genre.name}>{genre.name}</span>)}
                              </div>
                              { entry.favorite && 
                                <div className='d-flex mt-1'>
                                  <span className="badge badge-favorite">Favorite</span>
                                </div>}
                              <div className="mt-3">
                                <p className="text-muted small mb-2 text-start">{entry.notes}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {selectedBook?.id === entry.book.id && (
                          <div className="mt-3 p-3 border-top" 
                            onClick={e => e.stopPropagation()}
                          >
                            <div className="row g-3">
                              <div className="col-sm-6">
                                <label className="form-label small fw-semibold">Reading Status</label>
                                <select
                                  className="form-select form-select-sm"
                                  style={{ transition: 'none' }}
                                  value={editStatus}
                                  onChange={e => setEditStatus(e.target.value)}
                                >
                                  <option value="READ_LATER">Read Later</option>
                                  <option value="READING">Reading</option>
                                  <option value="COMPLETED">Completed</option>
                                </select>
                              </div>

                              <div className="col-sm-6 d-flex align-items-end">
                                <button
                                  type="button"
                                  className={`btn btn-sm w-100 ${editFavorite ? 'btn-cozy' : 'btn-outline-cozy'}`}
                                  onClick={() => setEditFavorite(f => !f)}
                                >
                                  {editFavorite ? '★ Favorited' : '☆ Add to Favorites'}
                                </button>
                              </div>

                              <div className="col-12">
                                <label className="form-label small fw-semibold">Notes</label>
                                <textarea
                                  className="form-control form-control-sm"
                                  rows={3}
                                  placeholder="Write your notes..."
                                  value={editNote}
                                  onChange={e => setEditNote(e.target.value)}
                                />
                              </div>

                              <div className="col-12 d-flex gap-2 justify-content-between">
                                <button
                                  className="btn btn-danger"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(entry.book.id);
                                  }}
                                >Remove</button>
                                <div className='d-flex gap-2'>

                                  <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={(e) => { e.stopPropagation(); setSelectedBook(null); }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="btn btn-sm btn-cozy"
                                    onClick={(e) => handleUpdate(e)}
                                  >
                                    Save
                                  </button>

                                </div>
                              </div>
                            </div>
                          </div> 
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
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
    </>
  )
}

async function GetEntries(filters = {}, page=0, size=5) {
  const params = {
    page: page, 
    size: size, 
  };

  if(filters.title && filters.title != null) params.title = filters.title.toLowerCase();
  if(filters.genre && filters.genre != null)
    params.genre = filters.genre.toLowerCase();
  if(filters.status && filters.status != null)
    params.status = filters.status;
  if(filters.favorite && filters.favorite != null)
    params.favorite = filters.favorite == 'true'
      ? true : false;

  const res = await api.getEntries(params);
  console.log(res);
  return res;
}
