import { useEffect, useState } from 'react'; 
import { useApp } from '../context/AppContext';
import { api } from '../api.js';

export default function BookModal({ book, reviews = [], savedIds, setSavedBookIds, onClose }) {
  const { user } = useApp();
  const isSaved = savedIds.has(book.id);
  const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
  
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('READ_LATER');
  const [notes, setNotes] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isSaved) {
        await api.deleteEntry(book.id);
        removeSavedId(book.id);
        setShowForm(false);
      } else {
        await api.addEntry({ bookId: book.id, status, notes, favorite });
        addSavedId(book.id);
        setShowForm(false);
      }  
    } finally {
      setSaving(false);
    }
  };

  const addSavedId = (bookId) => setSavedBookIds(prev => new Set([...prev, bookId]));

  const removeSavedId = (bookId) => setSavedBookIds(prev => {
    const next = new Set(prev);
    next.delete(bookId); 
    return next;
  });

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content modal-cozy pb-3">
          <div className="modal-header">
            <h5 className="modal-title">{book.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <img 
                  src={coverUrl} 
                  alt={book.title}
                  className="img-fluid rounded"
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-8">
                <p className="text-muted mb-2">by {book.authors}</p>
                <div className="mb-3">
                  <span className="badge badge-genre me-2">{book.genre}</span>
                  <span className="stars">{'★'.repeat(Math.floor(book.rating))} {book.rating}</span>
                </div>
                <p className="mb-3">{book.description}</p>
                <p className="small text-muted">ISBN: {book.isbn}</p>

                <h6 className="mt-4 mb-3">Reviews</h6>
                {reviews.length != 0 
                  ? reviews?.map((review, idx) => (
                    <div key={idx} className="border-bottom pb-2 mb-2">
                      <div className="d-flex justify-content-between">
                        <strong className="small">{review.user.name}</strong>
                        <span className="stars small">{'★'.repeat(review.rating)}</span>
                      </div>
                      <p className="small mb-0 text-muted">{review.content}</p>
                    </div>
                  ))
                  : <p className="small text-muted">No reviews for this book.</p>
                }
              </div>
            </div>
            {user && showForm && !isSaved && (
              <div className="mt-4 pt-3">
                <h6 className="mb-3">Add to Library</h6>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold">Reading Status</label>
                    <select
                      className="form-select form-select-sm"
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      style={{ transition: 'none' }}
                    >
                      <option value="READ_LATER">Read Later</option>
                      <option value="READING">Reading</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  <div className="col-sm-6 d-flex align-items-end">
                    <button
                      type="button"
                      className={`btn btn-sm w-100 ${favorite ? 'btn-cozy' : 'btn-outline-cozy'}`}
                      onClick={() => setFavorite(f => !f)}
                    >
                      {favorite ? '★ Favorited' : '☆ Add to Favorites'}
                    </button>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Notes</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows={3}
                      placeholder="Write your notes here..."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {user && (
            <div className="d-flex gap-2 justify-content-center mt-3 px-3">
              {!isSaved && (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowForm(f => !f)}
                >
                  {showForm ? 'Cancel' : 'Add Notes'}
                </button>
              )}
              <button
                type="button"
                className={`btn btn-sm ${isSaved ? 'btn-outline-cozy' : 'btn-cozy'}`}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : isSaved ? 'Remove from Library' : 'Save to Library'}
              </button>
            </div>
          )}
          { /* user && (
            <div className="mb-3">
              <button 
                type="button" 
                className={`btn m-auto ${isSaved ? 'btn-outline-cozy' : 'btn-cozy'}`}
                onClick={handleSave}
              >
                {isSaved ? 'Remove from Library' : 'Save to Library'}
              </button>
            </div>
          ) */}
        </div>
      </div>
    </div>
  );
}

