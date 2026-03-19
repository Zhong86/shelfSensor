import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { useApp } from '@/context/AppContext'
import { useState, useEffect } from 'react';

//TODO FIX FUNCTIONALITY & PAGE
export default function PersonalPage() {
  const { user } = useApp();
  const [entries, setEntries] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null); 
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if(entries == null) {
      setEntries(fetchEntries());
    }
  }, []);

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
              <Link href="/login" className="btn btn-cozy">
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
              <p>Browse our collection and save books to your library</p>
              <Link href="/" className="btn btn-cozy">
                Browse Books
              </Link>
            </div>
          ) : (
              <div className="row">
                {entries.map(entry => (
                  <div className="col-12 mb-4" key={entry.id}>
                    <div className="card card-cozy">
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
                              <div>
                                <h5 className="mb-1">{entry.book.title}</h5>
                                <p className="text-muted small mb-2">{entry.book.author}</p>
                                <span className="badge badge-genre">{entry.book.genre}</span>
                              </div>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeBook(book.id)}
                              >
                                Remove
                              </button>
                            </div>

                            <div className="mt-3">
                              <button
                                className="btn btn-sm btn-outline-cozy"
                                onClick={() => setSelectedBookId(selectedBookId === book.id ? null : book.id)}
                              >
                                {selectedBookId === book.id ? 'Hide Notes' : `Notes (${getBookNotes(book.id).length})`}
                              </button>
                            </div>

                            {selectedBookId === book.id && (
                              <div className="mt-3 p-3 rounded" style={{ backgroundColor: 'var(--cozy-cream)' }}>
                                <div className="mb-3">
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Add a note..."
                                      value={newNote}
                                      onChange={(e) => setNewNote(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && handleAddNote(book.id)}
                                    />
                                    <button 
                                      className="btn btn-cozy"
                                      onClick={() => handleAddNote(book.id)}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>

                                {getBookNotes(book.id).length === 0 ? (
                                  <p className="text-muted small mb-0">No notes yet</p>
                                ) : (
                                    getBookNotes(book.id).map(note => (
                                      <div key={note.id} className="note-card p-2 mb-2 rounded">
                                        <div className="d-flex justify-content-between">
                                          <p className="mb-0 small">{note.text}</p>
                                          <button 
                                            className="btn btn-sm text-danger p-0"
                                            onClick={() => deleteNote(note.id)}
                                          >
                                            ×
                                          </button>
                                        </div>
                                        <small className="text-muted">
                                          {new Date(note.createdAt).toLocaleDateString()}
                                        </small>
                                      </div>
                                    ))
                                  )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </>
  )
}

async function fetchEntries(userId) {

}
